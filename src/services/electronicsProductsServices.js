import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firestoreConfig";

export const getProductDetails = async (productId) => {
  const collRef = collection(db, "electronicsProducts");
  const docRef = doc(collRef, String(productId));
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;

  return { ...snapshot.data(), quantity: 1 };
};
