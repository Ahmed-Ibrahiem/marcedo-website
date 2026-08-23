import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firestoreConfig";

export const addNewOrder = async (data) => {
  const ordersColl = collection(db, "orders");
  const orderData = {
    ...data,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };

  let docRef;

  if (data.user_id) {
    docRef = doc(ordersColl, data.user_id);
  } else {
    docRef = doc(ordersColl);
  }

  await setDoc(docRef, { ...orderData, id: docRef.id });

  return docRef.id;
};
