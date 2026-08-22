import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firestoreConfig";

export const getBrandName = async (pro_id) => {
  const docRef = doc(collection(db, "brands"), String(pro_id));
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;

  return snapshot.data().name;
};

export const getAllBrands = async () => {
  const collRef = collection(db, "brands");

  const snapshot = await getDocs(collRef);
  if (snapshot.empty) return [];

  return snapshot.docs.map((doc) => doc.data());
};

export const addNewBrand = async (data) => {
  const collRef = collection(db, "brands");

  const newDocRef = doc(collRef);

  const brandData = {
    ...data,
    id: newDocRef.id,
  };

  await setDoc(newDocRef, brandData);

  return brandData;
};

export const getBrandNameByBrandId = async (brand_id) => {
  const docRef = doc(collection(db, "brands"), brand_id);

  const brandSnap = await getDoc(docRef);
  return brandSnap.data().name;
};

export const getBrandNameBySlug = async (slug) => {
  const brandSnap = await getDocs(
    query(collection(db, "brands"), where("slug", "==", slug)),
  );

  if (brandSnap.empty) return null;

  return brandSnap.docs[0].data();
};
