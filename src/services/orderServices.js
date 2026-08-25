import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firestoreConfig";

export const addNewOrder = async (data) => {
  const ordersColl = collection(db, "orders");
  const orderData = {
    ...data,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };

  const docRef = doc(ordersColl);

  await setDoc(docRef, { ...orderData, id: docRef.id });

  return docRef.id;
};

export const getOrderById = async (id) => {
  const order = await getDoc(doc(db, "orders", id));

  if (!order.exists) return null;

  return order.data();
};

export const getOrdersByUserId = async (userId) => {
  const q = query(collection(db, "orders"), where("user_id", "==", userId));

  const ordersSnap = await getDocs(q);

  if (ordersSnap.empty) return [];

  return [...ordersSnap.docs.map((doc) => doc.data())];
};

export const getOrders = async (userId) => {
  const ordersSnap = await getDocs(collection(db, "orders"));

  if (ordersSnap.empty) return [];

  return [...ordersSnap.docs.map((doc) => doc.data())];
};
