import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firestoreConfig";

// Get All Users In Collection
export const getUsers = async () => {
  const collRef = collection(db, "usersData");
  const snapshot = await getDocs(collRef);

  return snapshot.docs.map((doc) => ({ ...doc.data() }));
};

// Get user by email or phone
export const getUserByEmailOrPhone = async (emailOrPhone) => {
  // Get user by email
  const usersRef = collection(db, "usersData");

  const emailQuery = query(
    usersRef,
    where("email", "==", emailOrPhone.trim().toLowerCase()),
  );
  const emailSnapshot = await getDocs(emailQuery);
  if (!emailSnapshot.empty) {
    return { id: emailSnapshot.docs[0].id, ...emailSnapshot.docs[0].data() };
  }

  const phoneQuery = query(usersRef, where("phone", "==", emailOrPhone.trim()));
  const phoneSnapshot = await getDocs(phoneQuery);
  if (!phoneSnapshot.empty) {
    return { id: phoneSnapshot.docs[0].id, ...phoneSnapshot.docs[0].data() };
  }

  return null;
};

// Add a new user in usersData colllection
export const addNewUser = async (userData) => {
  const usersRef = collection(db, "usersData");
  const docRef = await addDoc(usersRef, userData);

  return { id: docRef.id, ...userData };
};
