import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "./firestoreConfig";
import {
  product_details,
  product_pricing,
  product_stock,
  product_media,
  product_shipping,
  product_variants,
  productReviews,
  ratings,
} from "../assets/assets";

const seedCollection = async (collectionName, data = []) => {
  const batch = writeBatch(db);

  data.forEach((item) => {
    const ref = doc(collection(db, collectionName), String(item.product_id));
    batch.set(ref, item);
  });

  await batch.commit();
};

export const seedAllData = async () => {
  try {
    await seedCollection("product-details" , product_details)
    await seedCollection("product-pricing" , product_pricing)
    await seedCollection("product-stock" , product_stock)
    await seedCollection("product-media" , product_media)
    await seedCollection("product-shipping" , product_shipping)
    await seedCollection("product-variants" , product_variants)
    await seedCollection("product-reviews" , productReviews)
    await seedCollection("product-ratings" , ratings)

    console.log("All Data Uploaded!");
  } catch (error) {
    console.log("something went wrong", error);
  }
};
