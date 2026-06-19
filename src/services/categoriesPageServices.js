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
  const optionsValues = await getVariantsOptions(products);

  /* =====================
  Get All Brands of products
  ======================== */
  const brandsOptions = await getProductsBrands(products);

  return {
    products,
    price: { min: minPrice, max: maxPrice },
    options: optionsValues,
    brands: brandsOptions,
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
  const productsOptions = [
    ...new Set(
      allVariants.flatMap((variant) => variant.options).flatMap((v) => v.key),
    ),
  ];

  // Get the value of options
  const optionsValues = productsOptions.map((option) => {
    // return all values of varainst except color because his values are array of object
    // unlike others of variants have values are array of string
    if (option !== "color") {
      return {
        key: [option],
        values: [
          ...new Set(
            allVariants
              .flatMap((variant) => variant.options)
              .filter((op) => op.key === option)
              .flatMap((op) => [...op.values]),
          ),
        ],
      };
    } else {
      const colorObjects = allVariants
        .flatMap((variant) => variant.options)
        .filter((op) => op.key === "color")
        .flatMap((op) => op.values); // [{ label, hex }, { label, hex }, ...]

      // Remove the repeat by using label
      const uniqueColors = Object.values(
        Object.fromEntries(colorObjects.map((c) => [c.label, c])),
      );

      return { key: "color", values: uniqueColors };
    }
  });

  return optionsValues;
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
      return [...products].sort((a, b) => new Date(a.created_at) - new Date(b.created_at) );
    case "date, new to old":
      return [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at) );
    default:
      return [...products];
  }
};
