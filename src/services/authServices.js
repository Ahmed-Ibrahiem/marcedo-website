import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firestoreConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const signUP = async (data) => {
  const userCreditional = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );
  const user = userCreditional.user;

  const userData = {
    id: user.uid,
    email: user.email,
    first_name: data.first_name,
    last_name: data.last_name ?? "",
    avatar: null,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
    role: "user",
  };

  const userDoc = doc(db, "users", user.uid);

  await setDoc(userDoc, userData);
};

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = async () => {
  const userCreditional = await signInWithPopup(auth, googleProvider);
  const user = userCreditional.user;

  const userSnap = await getDoc(doc(collection(db, "users"), user.uid));

  if (!userSnap.exists()) {
    const userData = {
      id: user.uid,
      email: user.email,
      first_name: user.displayName,
      last_name: "",
      avatar: null,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      role: "user",
    };

    await setDoc(doc(collection(db, "users"), user.uid), userData);

    return userData;
  }

  return userSnap.data();
};

export const logOut = () => signOut(auth);
