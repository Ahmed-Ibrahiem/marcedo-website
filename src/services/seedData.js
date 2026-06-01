import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "./firestoreConfig";
import { brands, categories, details, media, pricing, products, ratings, reviews, shipping, stocks, variants } from "./MokeData";

const seedCollection = async (collectionName, data = []) => {
  const batch = writeBatch(db);

  data.forEach((item) => {
    const ref = doc(collection(db, collectionName), String(item.id));
    batch.set(ref, item);
  });

  await batch.commit();
};

export const seedAllData = async () => {
  try {
    await seedCollection("categories", categories);
    await seedCollection("products", products);
    await seedCollection("brands", brands);
   
    console.log("All Data Uploaded!");
  } catch (error) {
    console.log("something went wrong", error);
  }
};
