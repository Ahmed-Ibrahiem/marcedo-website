import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firestoreConfig";

export const getAllProducts = async () => {
  const collRef = collection(db, "products");

  const snapshot = await getDocs(collRef);

  if (snapshot.empty) return null;

  return [...snapshot.docs.map((doc) => doc.data())];
};

export const getProductById = async (id) => {
  const docRef = doc(collection(db, "products"), String(id));

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;

  return snapshot.data();
};

export const getProductBySlug = async (slug) => {
  const q = query(collection(db, "products"), where("slug", "==", slug));

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};

export const getBestSellerProducts = async () => {
  const q = query(
    collection(db, "products"),
    where("is_best_seller", "==", true),
    orderBy("sold_count"),
    limit(8),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return [];

  return snapshot.docs.map((doc) => doc.data());
};

export const getProductsByName = async (searchKey) => {
  const theWord = searchKey.toLowerCase().trim();
  const collRef = collection(db, "products");

  const snapshot = await getDocs(collRef);

  if (snapshot.empty) return [];

  return [
    ...snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.name.toLowerCase().trim().includes(theWord)),
  ];
};
