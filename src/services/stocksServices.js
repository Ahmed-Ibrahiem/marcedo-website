import { collection, getDocs } from "firebase/firestore";
import { db } from "./firestoreConfig";

export const getAllProductsStocks = async () => {
  const collRef = collection(db, "product-stock");
  const snap = await getDocs(collRef);

  return snap.docs.map((doc) => doc.data());
};


export const getAllProductsStocksMap = async () => {
  const collRef = collection(db, "product-stock");
  const snapshot = await getDocs(collRef);

  if (snapshot.empty) return [];
  const stockMap = {};
  snapshot.docs.forEach((doc) => {
    stockMap[doc.id] = doc.data();
  });

  return stockMap;
};


