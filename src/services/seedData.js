import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "./firestoreConfig";
// import listingProducts from "../data/listingProducts.json";
// import allProudcts from "../data/ProductData.json";
// import dressesData from "../data/all_products.json";
// import userData from "../data/Users.json";

const seedCollection = async (collectionName, data = []) => {
  const batch = writeBatch(db);

  data.forEach((item) => {
    const ref = doc(collection(db, collectionName), String(item.id));
    batch.set(ref, item);
  });

  await batch.commit();
  console.log(`${collectionName} , "Upload Successfully"`);
};

export const seedAllData = async () => {
  try {
    // await seedCollection("usersData", userData);
    // await seedCollection("collectionsData", collectionsData);
    console.log("All Data Uploaded!");
  } catch {
    console.log("something went wrong");
  }
};
