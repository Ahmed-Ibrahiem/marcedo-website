import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../../lib/schema/signUpSchema";
import Form_errors_message from "../../Components/ui/Errors/Form_errors_message";
import styles from "./Auth_popup.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { RiLoader4Line } from "react-icons/ri";
import { signUP } from "../../services/authServices";
import { use_auth_context } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ formLoading, setFormLoading }) => {
  const [show_password, set_show_password] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { set_auth_open, getErrorMessage, auth_open } = use_auth_context();
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    if (formLoading) return;

    setIsLoading(true);
    setFormLoading(true);

    try {
      await signUP(data);
      set_auth_open(false);
      navigate("/");
    } catch (error) {
      console.error("Sign Up Error: ", error);
      if (error instanceof Error) {
        if (error.name === "FirebaseError") {
          setError(
            "Something went wrong. Try logging in instead, or use a different email.",
          );
          return;
        }
        setError(error.message);
      } else {
        setError(getErrorMessage(error.code));
      }
    } finally {
      setFormLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    form.reset();
    setError("");
  }, [auth_open]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* First Name */}
      <div className={styles.form_group}>
        <input
          type="text"
          placeholder="First Name"
          className={`${styles.input}`}
          {...register("first_name")}
        />
        {errors.first_name && (
          <Form_errors_message message={errors.first_name.message} />
        )}
      </div>

      {/* Last Name */}
      <div className={styles.form_group}>
        <input
          type="text"
          placeholder="Last Name"
          className={`${styles.input}`}
          {...register("last_name")}
        />
        {errors.last_name && (
          <Form_errors_message message={errors.last_name.message} />
        )}
      </div>

      {/* Email Input */}
      <div className={styles.form_group}>
        <input
          type="text"
          placeholder="Enter your email"
          className={`${styles.input}`}
          {...register("email")}
        />
        {errors.email && <Form_errors_message message={errors.email.message} />}
      </div>

      {/* Password Input */}
      <div className={styles.form_group}>
        <div className={styles.password_wrapper}>
          <input
            type={show_password ? "text" : "password"}
            placeholder="Password*"
            className={`${styles.input}`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => set_show_password(!show_password)}
            className={styles.toggle_passward_btn}
          >
            {show_password ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.password && (
          <Form_errors_message message={errors.password.message} />
        )}
      </div>

      {/* Sign Up Button */}
      <button type="submit" className={styles.main_btn} disabled={formLoading}>
        {isLoading && <RiLoader4Line size={20} className="animate-spin" />}
        {!isLoading ? "Sign Up" : "Sign in..."}
      </button>

      {error && <Form_errors_message message={error} style={"-mt-2"} />}
    </form>
  );
};

export default SignUpForm;
