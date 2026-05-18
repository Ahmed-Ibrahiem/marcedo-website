import { collection, getDocs } from "firebase/firestore";
import { db } from "./firestoreConfig";

// Get all listingProducts from firestore
export const getListingProducts = async () => {
  // get listingProducts collection ref
  const collRef = collection(db, "listingProducts");
  // Get snapshot from documents that's in listingProducts collection
  const snapshot = await getDocs(collRef);

  // Return listingProducts data after update quantity
  return snapshot.docs.map((doc) => ({ ...doc.data(), quantity: 1 }));
};
