import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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
