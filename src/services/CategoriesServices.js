import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firestoreConfig";

export const getCategoryName = async (categoryIds) => {
  const q = query(collection(db, "categories"), where("id", "in", categoryIds));

  const snapshot = await getDocs(q);

  if (snapshot.empty) return [];

  const categories = snapshot.docs.map((doc) => doc.data());

  const child = categories.find((categ) => categ.parent_id);
  const parent = categories.find((categ) => !categ.parent_id);

  if (child) return child.name;
  else return parent.name;
};

export const getCategoriesAsStringFromDB = async (categoryIds) => {
  const q = query(collection(db, "categories"), where("id", "in", categoryIds));

  const snapshot = await getDocs(q);

  if (snapshot.empty) return [];

  const categoriesNames = [...snapshot.docs.map((doc) => doc.data())].map(
    (doc) => doc.name,
  );

  return categoriesNames.join(",");
};

export const getAllCategories = async () => {
  const collRef = collection(db, "categories");
  const snapshot = await getDocs(collRef);

  if (snapshot.empty) return [];
  return [...snapshot.docs.map((doc) => doc.data())];
};

export const getCategoryBySlug = async (categorySlug) => {
  const q = query(
    collection(db, "categories"),
    where("slug", "==", categorySlug),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};
