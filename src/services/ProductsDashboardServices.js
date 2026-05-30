import { collection, getDocs } from "firebase/firestore";
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
        type: "total-products",
      },
      {
        id: 1,
        title: "In Stock",
        value: in_stock.length,
        change: 6.5,
        type: "in-stock",
      },
      {
        id: 2,
        title: "In Discount",
        value: inDiscount.length,
        change: 12.4,
        type: "in-discount",
      },
      {
        id: 3,
        title: "Out Stock",
        value: outStock.length,
        change: 2.1,
        type: "out-of-stock",
      },
      {
        id: 4,
        title: "Avg. Ratings",
        value: avgRatings,
        change: 0.3,
        type: "ratings",
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
