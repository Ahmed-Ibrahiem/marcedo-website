import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
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

export const getlevelOneOfCategories = async () => {
  const collRef = collection(db, "categories");
  const q = query(collRef, where("level", "==", 1));

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return snapshot.docs.map((doc) => doc.data());
};

export const getLevelTwoByCategoryId = async (parentId) => {
  const q = query(
    collection(db, "categories"),
    where("parent_id", "==", parentId),
  );

  console.log(parentId);

  const snapshot = await getDocs(q);

  if (snapshot.empty) return [];

  return snapshot.docs.map((doc) => doc.data());
};

export const addNewCategory = async (categoryName, parentId) => {
  const collRef = collection(db, "categories");

  const categories = (await getDocs(collRef)).docs.map((doc) => doc.data());

  // check if this category is exist or not
  const isExist =
    categories.find(
      (categ) =>
        categ.name.trim().toLowerCase() === categoryName.trim().toLowerCase(),
    ) || null;

  if (!isExist) {
    const parent = parentId
      ? categories.find((categ) => categ.id === parentId)
      : null;

    const newDocRef = doc(collRef);

    const categoryData = {
      id: newDocRef.id,
      name: categoryName,
      parent_id: parent ? parent.id : null,
      level: parent ? parent.level + 1 : 1,
      slug: categoryName.trim().toLowerCase().split(" ").join("-"),
    };

    await setDoc(newDocRef, categoryData);

    return categoryData;
  }

  return null;
};
