import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firestoreConfig";

// Get All Users In Collection
export const getUsers = async () => {
  const collRef = collection(db, "usersData");
  const snapshot = await getDocs(collRef);

  return snapshot.docs.map((doc) => ({ ...doc.data() }));
};

export const getUserById = async (id) => {
  const userRef = doc(db, "users", id);

  const userSnapShot = await getDoc(userRef);

  if (!userSnapShot.exists()) {
    return null;
  }

  return userSnapShot.data();
};

// Add a new user in usersData colllection
export const addNewUser = async (userData) => {
  const usersRef = collection(db, "usersData");
  const docRef = await addDoc(usersRef, userData);

  return { id: docRef.id, ...userData };
};
