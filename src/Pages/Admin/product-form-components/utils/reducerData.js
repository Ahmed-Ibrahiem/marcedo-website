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
    .max(400, "The maximum number is 200 charachter"),
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
  related_ids: yup.array(),
});


