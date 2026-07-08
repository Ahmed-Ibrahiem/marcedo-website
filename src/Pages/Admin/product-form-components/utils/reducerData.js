import * as yup from "yup";
import {
  doc,
  collection,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../services/firestoreConfig";

export const step1Schema = yup.object({
  name: yup.string().required("This field is required"),
  short_description: yup
    .string()
    .required("This field is required")
    .max(200, "The maximum number is 200 charachter"),
  brand_id: yup.string().required("This field is required"),
  category_ids: yup
    .array()
    .min(1, "Category is Required")
    .test(
      "ara there more then one main category",
      "There are more then one main category, please select one main category",
      (value) => {
        const categories = [...value];
        const level1Category = categories.filter((cat) => cat.level === 1);
        return level1Category.length <= 1;
      },
    )
    .test(
      "are there more the one category of level 2",
      "There are more then one sub category, please select one sub category",
      (value) => {
        const categories = [...value];
        const levels2 = categories.filter((cat) => cat.level === 2);
        return levels2.length <= 1;
      },
    ),
  description: yup.array().min(1, "There must be at least one block here"),
  tags: yup.array().of(yup.string()),
});

export const step2Schema = yup.object({
  gallery: yup.array().min(1, "There must be at least one image"),
  thumbnail: yup.string().required("This field is required"),
});

export const step3Schema = yup.object({});

export const numberField = () =>
  yup
    .number()
    .transform((value, originalValue) => {
      if (
        originalValue === "" ||
        originalValue === null ||
        originalValue === undefined
      ) {
        return undefined;
      }
      return Number(originalValue);
    })
    .typeError("Must be a valid number");

export const step4Schema = yup.object({
  sku: yup.string().when("$hasVariants", {
    is: false,
    then: (schema) =>
      schema
        .required("SKU is required")
        .matches(/^\S+$/, 'SKU cannot contain spaces, You can use "-" '),
    otherwise: (schema) => schema.notRequired(),
  }),

  original_price: numberField().when("$hasVariants", {
    is: false,
    then: (schema) =>
      schema
        .required("Price is required")
        .positive("Price must be greater than 0"),
    otherwise: (schema) => schema.notRequired(),
  }),

  discount_percentage: numberField()
    .min(0, "Discount cannot be negative")
    .max(99, "Discount cannot reach 100%"),

  quantity: numberField()
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),

  cost_price: numberField().min(0, "Cost price cannot be negative"),

  low_stock_threshold: numberField()
    .integer("Must be a whole number")
    .min(0)
    .when("track_inventroy", {
      is: true,
      then: (schema) => schema.required("Low stock threshold is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  discount_expires_at: yup
    .date()
    .default(undefined)
    .transform((value, originalValue) => {
      if (!originalValue) return undefined;
      return new Date(originalValue);
    })
    .when("discount_percentage", {
      is: (val) => val > 0,
      then: (schema) =>
        schema
          .required("This field is required")
          .min(new Date(), "Expiry date must be in the future"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const step5Schema = yup.object({
  is_active: yup.boolean(),
  is_featured: yup.boolean(),
  is_best_seller: yup.boolean(),
  related_ids: yup.array().of(yup.string()),
});

export const publishProduct = async (formData) => {
  const batch = writeBatch(db);

  const proRef = doc(collection(db, "products"));
  const proId = proRef.id;

  const thereVariants = formData.variants.length > 0;
  let lowestPriceVariant;

  if (thereVariants) {
    lowestPriceVariant = formData.variants.reduce((min, vari) =>
      vari.price < min.price ? vari : min,
    );
  }

  console.log(formData.related_ids);
  // Set Main Details Of Product
  batch.set(proRef, {
    slug: formData.name.split(" ").join("-"),
    brand_id: formData.brand_id,
    thumbnail: formData.thumbnail,
    stock_status: !thereVariants
      ? formData.quantity <= formData.low_stock_threshold
        ? "out_of_stock"
        : "in_stock"
      : formData.variants.find((vari) => vari.stock > vari.threshold)
        ? "in_stock"
        : "out_of_stock",
    tags: [...formData.tags],
    original_price: thereVariants
      ? lowestPriceVariant.original_price
      : formData.original_price,
    current_price: thereVariants
      ? lowestPriceVariant.price
      : formData.current_price,
    discount_percentage: thereVariants
      ? lowestPriceVariant.discount_percentage
      : formData.discount_percentage,
    currency: thereVariants ? lowestPriceVariant.currency : formData.currency,
    discount_expires_at: thereVariants
      ? (lowestPriceVariant.discount_expires_at ?? null)
      : (formData.discount_expires_at ?? null),
    sold_count: 0,
    updated_at: serverTimestamp(),
    sku: thereVariants ? lowestPriceVariant.sku : formData.sku,
    category_ids: [...formData.category_ids.map((cat) => cat.id)],
    id: proId,
    rating_average: 0,
    created_at: serverTimestamp(),
    name: formData.name,
    is_active: formData.is_active,
    is_best_seller: formData.is_best_seller,
    is_featured: formData.is_featured,
    related_ids: [...formData.related_ids],
  });

  // Set Product Details
  batch.set(doc(db, "product-details", proId), {
    description: [...formData.description],
    short_description: formData.short_description,
    product_id: proId,
  });

  // Product Media
  batch.set(doc(db, "product-media", proId), {
    gallery: [
      "/assets/products image/wristwatchs/product1/gallary_1.png",
      "/assets/products image/wristwatchs/product1/gallary_3.png",
    ],
    videos: [],
    product_id: proId,
    thumbnail: formData.thumbnail,
  });

  // Product Price
  batch.set(doc(db, "product-pricing", proId), {
    product_id: proId,
    offer_note: `${formData.discount_percentage}% OFF`,
    original_price: thereVariants
      ? lowestPriceVariant.original_price
      : formData.original_price,
    current_price: thereVariants
      ? lowestPriceVariant.price
      : formData.current_price,
    discount_percentage: thereVariants
      ? lowestPriceVariant.discount_percentage
      : formData.discount_percentage,
    currency: thereVariants ? lowestPriceVariant.currency : formData.currency,
    discount_expires_at: thereVariants
      ? lowestPriceVariant.discount_expires_at
      : formData.discount_expires_at,
  });

  // Get the Options of Variants
  let options = null;
  if (thereVariants) {
    const allAttributePairs = formData.variants.flatMap((variant) =>
      Object.entries(variant.attributes).map(([key, values]) => ({
        key,
        values,
      })),
    );

    const map = new Map();

    allAttributePairs.forEach(({ key, values }) => {
      if (!map.has(key)) {
        map.set(key, new Set());
      }
      map.get(key).add(values);
    });

    const finalOptions = Array.from(map.entries()).map(([key, valuesSet]) => ({
      key,
      values: Array.from(valuesSet),
    }));

    options = finalOptions.map((op) => {
      if (op.key === "color")
        return {
          ...op,
          values: op.values.map((value) => ({
            name: value,
            hex: formData.colorPalette[value] ?? null,
          })),
        };
      return op;
    });
  }

  // Product Variants
  if (thereVariants) {
    batch.set(doc(db, "product-variants", proId), {
      product_id: proId,
      variants: formData.variants,
      options: options,
    });
  }

  // Product Stock
  batch.set(doc(db, "product-stock", proId), {
    product_id: proId,
    low_stock_threshold: thereVariants
      ? lowestPriceVariant.threshold
      : formData.low_stock_threshold,
    status: !thereVariants
      ? formData.quantity <= formData.low_stock_threshold
        ? "out_of_stock"
        : "in_stock"
      : formData.variants.find((vari) => vari.stock > vari.threshold)
        ? "in_stock"
        : "out_of_stock",
    quantity: thereVariants ? lowestPriceVariant.stock : formData.quantity,
  });

  batch.set(doc(db, "product-shipping", proId), {
    product_id: proId,
    estimated_delivery_days: `${formData.estimated_delivery_days.from} - ${formData.estimated_delivery_days.to} Business Days`,
    from: formData.from,
    shipping_type: formData.shipping_type,
    is_free: formData.is_free,
  });

  await batch.commit();
  return proId;
};
