import {
  collection,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "./firestoreConfig";

export const getProductsStats = async () => {
  const docRef = collection(db, "products");

  const snapshot = await getDocs(docRef);

  if (snapshot.empty) return null;

  const products = [...snapshot.docs.map((doc) => doc.data())];
  const in_stock = products.filter((pro) => pro.stock_status === "in_stock");
  const outStock = products.filter(
    (pro) => pro.stock_status === "out_of_stock",
  );
  const inDiscount = products.filter((pro) => pro.has_discount);
  const prodcutsRatings = products
    .map((pro) => pro.rating_average)
    .reduce((prev, cur) => prev + (cur || 0), 0);

  const avgRatings = (prodcutsRatings / products.length).toFixed(1);

  if (products.length > 0) {
    return [
      {
        id: 0,
        title: "Total Products",
        value: products.length,
        change: 8.2,
        id: "total-products",
      },
      {
        id: 1,
        title: "In Stock",
        value: in_stock.length,
        change: 6.5,
        id: "in-stock",
      },
      {
        id: 2,
        title: "In Discount",
        value: inDiscount.length,
        change: 12.4,
        id: "in-discount",
      },
      {
        id: 3,
        title: "Out Stock",
        value: outStock.length,
        change: 2.1,
        id: "out-of-stock",
      },
      {
        id: 4,
        title: "Avg. Ratings",
        value: avgRatings,
        change: 0.3,
        id: "ratings",
      },
    ];
  }
};

export const getAllCategoreis = async () => {
  const collRef = collection(db, "categories");

  const snapshot = await getDocs(collRef);

  if (snapshot.empty) return null;

  return [...snapshot.docs.map((doc) => doc.data())];
};

export const getAllBrands = async () => {
  const collRef = collection(db, "brands");

  const snapshot = await getDocs(collRef);

  if (snapshot.empty) return null;

  return [...snapshot.docs.map((doc) => doc.data())];
};

export const getLimitedProducts = async (limitNumber) => {
  const collRef = query(collection(db, "products"), limit(limitNumber));

  const snapshot = await getDocs(collRef);

  if (snapshot.empty) return null;

  return snapshot.docs.map((doc) => doc.data());
};

export const getProductsWithPaginations = async (filterOptions) => {
  const constraints = [];

  // Filter Products
  if (filterOptions.categories.id !== "all-categories") {
    constraints.push(
      where("category_ids", "array-contains", filterOptions.categories.id),
    );
  }
  if (filterOptions.brands.id !== "all-brands") {
    constraints.push(where("brand_id", "==", filterOptions.brands.id));
  }
  if (filterOptions.status.id !== "all-status") {
    constraints.push(where("is_active", "==", filterOptions.status.id));
  }
  if (filterOptions.stocks.id !== "all-stocks") {
    constraints.push(where("stock_status", "==", filterOptions.stocks.id));
  }
  // Sort Products
  if (filterOptions.sort.id === "newest")
    constraints.push(orderBy("created_at", "desc"));
  else if (filterOptions.sort.id === "best-seller")
    constraints.push(orderBy("sold_count", "asc"));
  else if (filterOptions.sort.id === "a-to-z")
    constraints.push(orderBy("name", "asc"));
  else if (filterOptions.sort.id === "a-to-z")
    constraints.push(orderBy("name", "desc"));

  // Get Produts Count
  const countQuery = query(collection(db, "products"), ...constraints);
  const countSnapshot = await getCountFromServer(countQuery);
  const totalProducts = countSnapshot.data().count;

  // Get Products
  const productsQuery = query(collection(db, "products"), ...constraints);
  const productsSnapshot = await getDocs(productsQuery);

  if (productsSnapshot.empty) return [];

  return [...productsSnapshot.docs.map((doc) => doc.data())];
};
