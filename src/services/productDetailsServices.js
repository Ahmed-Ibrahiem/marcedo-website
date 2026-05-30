import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firestoreConfig";

export const getProductMedia = async (product_id) => {
  const docRef = doc(collection(db, "product-media"), String(product_id));

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;

  return snapshot.data();
};

export const getProductDetails = async (product_id) => {
  const docRef = doc(collection(db, "product-details"), String(product_id));

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;

  return snapshot.data();
};

export const getProductPricing = async (product_id) => {
  const docRef = doc(collection(db, "product-pricing"), String(product_id));

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;

  return snapshot.data();
};

export const getProductReviews = async (product_id) => {
  const q = query(
    collection(db, "product-reviews"),
    where("product_id", "==", product_id),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return snapshot.docs.map((doc) => doc.data());
};

export const getRelatedProducts = async (relatedIds) => {
  const q = query(collection(db, "products"), where("id", "in", relatedIds));

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return [...snapshot.docs.map((doc) => doc.data())];
};

export const getProductShipping = async (product_id) => {
  const docRef = doc(collection(db, "product-shipping"), String(product_id));

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;

  return snapshot.data();
};

export const getProductStock = async (product_id) => {
  const docRef = doc(collection(db, "product-stock"), String(product_id));

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;
  return snapshot.data();
};

export const getProductBrands = async (brand_id) => {
  const docRef = doc(collection(db, "brands"), String(brand_id));

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;
  return snapshot.data();
};

export const getProductVariants = async (product_id) => {
  const docRef = doc(collection(db, "product-variants"), String(product_id));

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;

  return snapshot.data();
};

export const getProductRatings = async (product_id) => {
  const docRef = doc(collection(db, "product-ratings"), String(product_id));

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;

  return snapshot.data();
};

export const getProductCategories = async (categ_ids) => {
  const q = query(collection(db, "categories"), where("id", "in", categ_ids));

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  return [...snapshot.docs.map((doc) => doc.data())];
};
