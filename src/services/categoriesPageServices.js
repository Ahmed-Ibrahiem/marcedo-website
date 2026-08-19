import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getCategoryBySlug } from "./CategoriesServices";
import { getProductsByCategories } from "./ProductsServices";
import { db } from "./firestoreConfig";

// Create function to chunk the products to the maximium limit of query number (becouse in operator has max limit "30")
const chunkArray = (array, size) => {
  const result = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
};

export const getCategoriesPageInfo = async (slug) => {
  const category = await getCategoryBySlug(slug);
  if (!category) return null;

  /* ===============================
  Get Products Depend On Category Id
  ================================== */
  const products = await getProductsByCategories(category.id);
  if (products.length === 0) return null;

  /* ==============================================
  Get Minimize and Maximize price of these products
  ================================================= */
  const productsPrices = products.map((pro) => pro.current_price);
  const minPrice = Math.min(...productsPrices);
  const maxPrice = Math.max(...productsPrices);

  /* =====================
  Get All variants of products "Coming Soon"
  ======================== */

  /* =====================
  Get Products Stocks status
  ======================== */
  let stocks = { inStock: 0, outStock: 0 };

  products.forEach((prod) => {
    if (prod.stock_status === "in_stock") {
      stocks = { ...stocks, inStock: ++stocks.inStock };
    } else {
      stocks = { ...stocks, outStock: ++stocks.outStock };
    }
  });

  /* =====================
  Get All Brands of products
  ======================== */
  const brandsOptions = await getProductsBrands(products);

  return {
    products,
    price: { min: minPrice, max: maxPrice },
    brands: brandsOptions,
    stocks,
    // options: optionsValues,
    // variants: allVariants,
  };
};

/* ========================================================
   Create function to get the variant option and it's values
   ========================================================= */
const getVariantsOptions = async (products) => {
  /* =====================
  Get variants of products
  ======================== */
  const productsId = products.map((pro) => pro.id);
  const productsIdsChunk = chunkArray(productsId, 30);
  const varaintsSnap = await Promise.all(
    productsIdsChunk.map((chunk) =>
      getDocs(
        query(
          collection(db, "product-variants"),
          where("product_id", "in", chunk),
        ),
      ),
    ),
  );

  const allVariants = varaintsSnap.flatMap((snap) =>
    snap.docs.map((doc) => doc.data()),
  );

  /* =======================
  Get the Option of variaint
  ========================= */

  const allOptions = allVariants.flatMap((variant) => variant.options);

  const productsOptions = [...new Set(allOptions.flatMap((v) => v.key))];

  const optionsValues = productsOptions.map((option) => {
    if (option !== "color") {
      return {
        key: [option],
        values: [
          ...new Set(
            allOptions
              .filter((op) => op.key === option)
              .flatMap((op) => [...op.values]),
          ),
        ],
      };
    } else {
      const colorObjects = allOptions
        .filter((op) => op.key === "color")
        .flatMap((op) => op.values);

      const uniqueColors = Object.values(
        Object.fromEntries(colorObjects.map((c) => [c.label, c])),
      );

      return { key: "color", values: uniqueColors };
    }
  });

  return { optionsValues, allVariants };
};

/* ===================================================
   Create function to get the brands of these products
   =================================================== */
const getProductsBrands = async (products) => {
  const brandsId = [...new Set(products.map((pro) => pro.brand_id))];

  const brandsSnap = await getDocs(
    query(collection(db, "brands"), where("id", "in", brandsId)),
  );

  return brandsSnap.docs
    .map((doc) => doc.data())
    .map((brand) => ({ name: brand.name, id: brand.id }));
};

export const sortProducts = (products, sortType) => {
  switch (sortType) {
    case "best selling":
      return [...products].sort((a, b) => b.sold_count - a.sold_count);
    case "alphabetically, a-z":
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case "alphabetically, z-a":
      return [...products].sort((a, b) => b.name.localeCompare(a.name));
    case "price, low to high":
      return [...products].sort((a, b) => a.current_price - b.current_price);
    case "price, high to low":
      return [...products].sort((a, b) => b.current_price - a.current_price);
    case "date, old to new":
      return [...products].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );
    case "date, new to old":
      return [...products].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    default:
      return [...products];
  }
};

export const getFilterProducts = async (
  activeFilter,
  variantsProducts,
  products,
) => {
  if (!products || Object.keys(activeFilter).length === 0) return products;

  // get the products that's between the price range
  const priceFiltered = products.filter((product) => {
    const { min, max } = activeFilter.price;
    const matchesPrice =
      product.current_price >= min && product.current_price <= max;

    if (!matchesPrice) return false; // return when products is not check price

    return true;
  });

  // If no products after price filtered return
  if (!priceFiltered.length) return [];

  // get the products depends of stocks status
  const stocksFiltered = priceFiltered.filter((product) => {
    if (!activeFilter.stocks?.length) return true;

    if (activeFilter.stocks.includes(product.stock_status)) return true;
    else return false;
  });

  // If no products after stocks filtered return
  if (!stocksFiltered.length) return [];
  
  // get the products depends of brands array
  const brandsFiltered = stocksFiltered.filter((product) => {
    if (!activeFilter.brands?.length) return true;
    
    if (activeFilter.brands.includes(product.brand_id)) return true;
    else return false;
  });
  
  
  // If no products after Brand filtered return
  if (!brandsFiltered.length) return [];

  if (!variantsProducts) return brandsFiltered;

  const resetVariants = variantsProducts.map((item) => ({
    products_id: item.product_id,
    variants: Object.fromEntries(
      item.options.map((option) => {
        if (option.key === "color")
          return [[option.key], [...option.values.map((val) => val.label)]];
        else return [[option.key], [...option.values]];
      }),
    ),
  }));

  const finallyProducts = filteredProducts.filter((product) => {
    const productVariant = resetVariants.find(
      (variant) => variant.products_id === product.id,
    );

    // 2. التحقق من باقي الـ variants filters (ديناميكي زي قبل كده)
    if (activeFilter.variants) {
      // first redesign activeFilter variants to array of objects
      const resetFilterVariants = Object.entries(activeFilter.variants);

      // check the activeFilter Variant matches with products variants or not
      const matchesVariants = resetFilterVariants.every(([key, values]) => {
        const productsValues = productVariant.variants[key];

        if (!productsValues) return false;

        return values.some((value) => productsValues.includes(value));
      });

      return matchesVariants;
    } else return true;
  });

  return brandsFiltered;
};

export const getAttributesByCategoriesId = async (categoryId) => {
  let optionsSnap;
  const catRef = collection(db, "categories");

  const category = (await getDoc(doc(catRef, categoryId))).data();

  const hasParentId = category.parent_id;

  // Check if parent is child of dress famile
  if (hasParentId) {
    const parentCat = (await getDoc(doc(db, "categories", hasParentId))).data();

    // check if paret cat has another parent
    if (parentCat.parent_id) {
      // check if parent id === cat_dresses
      if (parentCat.parent_id === "cat_dresses") {
        optionsSnap = await getDoc(
          doc(collection(db, "category-default-options"), "cat_dresses"),
        );

        const defaultOptions = optionsSnap.data().default_options;
        return defaultOptions;
      }
    }

    if (parentCat.id === "cat_dresses") {
      optionsSnap = await getDoc(
        doc(collection(db, "category-default-options"), "cat_dresses"),
      );

      const defaultOptions = optionsSnap.data().default_options;
      return defaultOptions;
    }
  }

  optionsSnap = await getDoc(
    doc(collection(db, "category-default-options"), categoryId),
  );

  const defaultOptions = optionsSnap.data().default_options;
  return defaultOptions;
};
