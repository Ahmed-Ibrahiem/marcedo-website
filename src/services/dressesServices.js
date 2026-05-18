import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "./firestoreConfig";

export const getDressesData = async () => {
  const collRef = collection(db, "dressesData");
  const snapshot = await getDocs(collRef);

  return snapshot.docs.map((doc) => ({ ...doc.data(), quantity: 1 }));
};
