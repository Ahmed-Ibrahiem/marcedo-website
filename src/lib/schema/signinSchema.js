import * as yup from "yup";
export const signInSchema = yup.object({
  email: yup.string().required("This Field Is Required").email("Invalid Email"),
  password: yup
    .string()
    .required("This Field Is Required")
    .min(8, "The password must be equal to or greater than 8"), // Minimum length 8
});


