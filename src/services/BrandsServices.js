import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firestoreConfig";

export const getBrandName = async (pro_id) => {
  const docRef = doc(collection(db, "brands"), String(pro_id));
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists) return null;

  return snapshot.data().name;
};
