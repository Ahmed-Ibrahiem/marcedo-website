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

export const getProductsByIdsGroup = async (products_ids) => {
  const collRef = collection(db, "products");
  const q = query(collRef, where("id", "in", products_ids));

  const snap = await getDocs(q);

  return [...snap.docs.map((doc) => doc.data())];
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

export const getProductsByCategories = async (category_id) => {
  const collRef = collection(db, "products");

  const q = query(
    collRef,
    where("category_ids", "array-contains", category_id),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return [];

  return [...snapshot.docs.map((doc) => doc.data())];
};

export const getProductsByCategoryOrBrandId = async (id) => {
  const prodColl = collection(db, "products");

  const [categQuery, brandQuery] = await Promise.all([
    getDocs(query(prodColl, where("category_ids", "array-contains", id))),
    getDocs(query(prodColl, where("brand_id", "==", id))),
  ]);

  console.log(categQuery.docs, brandQuery.docs);

  const productMap = new Map();

  categQuery.docs.forEach((doc) => productMap.set(doc.id, doc.data()));
  brandQuery.docs.forEach((doc) => productMap.set(doc.id, doc.data()));

  return [...productMap.values()];
};

export const getProductsByBrand = async (id) => {
  const prodColl = collection(db, "products");

  const prodSnap = await getDocs(query(prodColl, where("brand_id", "==", id)));

  return [...prodSnap.docs.map((doc) => doc.data())];
};
