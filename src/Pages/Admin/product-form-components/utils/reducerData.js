import * as yup from "yup";

export const step1Schema = yup.object({
  name: yup.string().required("This field is required"),
  short_description: yup
    .string()
    .required("This field is required")
    .max(200, "The maximum number is 200 charachter"),
  brand_id: yup.string().required("This field is required"),
  category_ids: yup.array().min(1, "Category is Required"),
  description: yup.array().min(1, "There must be at least one block here"),
});
