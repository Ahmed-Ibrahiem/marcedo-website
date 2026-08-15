import * as yup from "yup";
export const signUpSchema = yup.object({
  email: yup.string().required("This Field Is Required").email("Invalid Email"),
  password: yup
    .string()
    .required("This Field Is Required")
    .min(8, "The password must be equal to or greater than 8"), // Minimum length 8
  first_name: yup.string().min(2, "This Field Is Required"),
  last_name: yup.string(),
});
