import * as yup from "yup";

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
});

export const step2Schema = yup.object({
  gallery: yup.array().min(1, "There must be at least one image"),
  thumbnail: yup.string().required("This field is required"),
});

export const step3Schema = yup.object({});
