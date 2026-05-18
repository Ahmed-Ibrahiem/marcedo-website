import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firestoreConfig";
import { string } from "yup";

export const getCollections = async () => {
  const collRef = collection(db, "collectionsData");
  const snapshot = await getDocs(collRef);

  return snapshot.docs.map((doc) => ({ ...doc.data() }));
};

export const getCollectionBySlag = async (slag) => {
  const q = query(collection(db, "collectionsData"), where("slug", "==", slag));

  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];

  return doc.data();
};

export const getCollectionById = async (collId) => {
  const docRef = doc(collection(db, "collectionsData"), string(collId));

  const snapshot = await getDoc(docRef);

  return snapshot.data();
};
