import { createContext, use, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Create a context for authentication
const auth_context = createContext();

// Define validation schema using Yup
const schame = yup.object({
  email: yup.string().required("This Field Is Required"),
  password: yup
    .string()
    .required("This Field Is Required")
    .min(8, "The password must be equal to or greater than 8"), // Minimum length 8
  first_name: yup.string(), // Optional first name
  last_name: yup.string(), // Optional last name
  phone: yup.string(), // Optional phone
});

// Auth provider component to wrap around app
const Auth_provider = ({ children }) => {
  // State to manage current sign mode: 'sign_in' or 'create_account'
  const [sign_mode, set_sign_mode] = useState("sign_in");
  // State to control authentication modal visibility
  const [auth_open, set_auth_open] = useState(false);
  // State to indicate loading during API calls
  const [is_loading, set_is_loading] = useState(false);

  // Get user info from local storage if exists
  const user_info_storage = JSON.parse(
    localStorage.getItem("user_info") || null,
  );
  // State to store current user info
  const [user_info, set_user_info] = useState(user_info_storage || {});

  // Initialize react-hook-form with default values and validation schema
  const auth_form = useForm({
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
    },
    resolver: yupResolver(schame),
  });

  const {
    register, // To register form inputs
    handleSubmit, // To handle form submit
    formState: { errors }, // To get form validation errors
    control, // For controlled inputs
    setError, // To set custom errors manually
  } = auth_form;

  // Function to handle form submission
  const onSubmit = async (data) => {
    const api_url = "/Users.json"; // API endpoint
    let res = [];
    try {
      set_is_loading(true); // Start loading
      const req = await axios.get(api_url); // Fetch existing users
      if (req.status === 200) {
        set_is_loading(false); // Stop loading
        res = [...req.data]; // Store fetched users
      }
    } catch (error) {
      // Handle error silently
    }

    // Find user by email or phone
    const get_user = res.find(
      (user) =>
        user.email.trim().toLowerCase() === data.email.trim().toLowerCase() ||
        user.phone.trim().toLowerCase() === data.email.trim().toLowerCase(),
    );

    // Sign in logic
    if (sign_mode === "sign_in") {
      if (!get_user) {
        // If user does not exist, set error
        setError("email", {
          type: "manual",
          message: "This Email Not Exist",
        });
        return;
      }

      if (get_user.password.trim() !== data.password.trim()) {
        // If password is incorrect, set error
        setError("password", {
          type: "manual",
          message: "The Password Is Not Correct",
        });
        return;
      }

      // Save user info and close auth modal
      set_user_info(get_user);
      set_auth_open(false);
    }

    // Create account logic
    if (sign_mode === "create_account") {
      const email_regext = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!email_regext.test(data.email.trim())) {
        setError("email", {
          type: "manual",
          message: "This email is not correct",
        });
        return;
      }

      if (get_user) {
        setError("email", {
          type: "manual",
          message: "This email is already exist",
        });
        return;
      }

      // Validate Egyptian phone number
      const phone_regex = /^(?:01[0125][0-9]{8}|(?:\+20|0020)1[0125][0-9]{8})$/;
      if (data.phone.trim() === "" || !phone_regex.test(data.phone)) {
        setError("phone", {
          type: "manual",
          message: "Please enter the correct number",
        });
        return;
      }

      // Set new user info
      set_user_info({
        id: res.length, // Assign an id based on existing users length
        name: `${data.first_name} ${data.last_name}`,
        username: `${data.first_name}${data.last_name.charAt(0)}`,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });

      set_auth_open(false); // Close auth modal
    }

    console.log("Submitted Data", data); // Debug submitted data
  };

  // Save user info to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("user_info", JSON.stringify(user_info));
  }, [user_info]);

  // Context value to be shared
  const value = {
    user_info,
    sign_mode,
    set_sign_mode,
    auth_open,
    set_auth_open,
    register,
    handleSubmit,
    errors,
    control,
    onSubmit,
  };

  return (
    <auth_context.Provider value={value}>{children}</auth_context.Provider>
  );
};

// Custom hook to access auth context
export const use_auth_context = () => {
  return useContext(auth_context);
};

export default Auth_provider;
