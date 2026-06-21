import {
  collection,
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

  for (let i = 0; i <= array.length; i += size) {
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
  if (products.length === 0) return [];

  /* ==============================================
  Get Minimize and Maximize price of these products
  ================================================= */
  const productsPrices = products.map((pro) => pro.current_price);
  const minPrice = Math.min(...productsPrices);
  const maxPrice = Math.max(...productsPrices);

  /* =====================
  Get All variants of products
  ======================== */
  const { optionsValues, allVariants } = await getVariantsOptions(products);

  /* =====================
  Get All Brands of products
  ======================== */
  const brandsOptions = await getProductsBrands(products);

  return {
    products,
    price: { min: minPrice, max: maxPrice },
    options: optionsValues,
    brands: brandsOptions,
    variants: allVariants,
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
  if (!variantsProducts || !products) return;

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

  // get the products that's between the price range
  const filteredProducts = products.filter((product) => {
    // 1. التحقق من الـ price range الأول (منطق مختلف تمامًا)
    const { min, max } = activeFilter.price;
    const matchesPrice =
      product.current_price >= min && product.current_price <= max;

    if (!matchesPrice) return false; // مفيش داعي نكمل لو السعر مش مطابق أصلاً

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

  return filteredProducts;
};
