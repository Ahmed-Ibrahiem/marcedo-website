import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signInSchema } from "../../lib/schema/signinSchema";
import Form_errors_message from "../../Components/ui/Errors/Form_errors_message";
import styles from "./Auth_popup.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { signIn } from "../../services/authServices";
import { use_auth_context } from "../../Context/AuthProvider";
import { RiLoader4Line } from "react-icons/ri";

const SignInForm = ({ formLoading, setFormLoading }) => {
  const [show_password, set_show_password] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getErrorMessage, set_auth_open, auth_open } = use_auth_context();
  const [error, setError] = useState("");

  const form = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    const { email, password } = data;

    if (formLoading) return;

    setIsLoading(true);
    setFormLoading(true);
    try {
      await signIn(email, password);
      set_auth_open(false);
    } catch (error) {
      setError(getErrorMessage(error.code));
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* Email Input */}
      <div className={styles.form_group}>
        <input
          type="text"
          placeholder="Enter your email"
          className={`${styles.input}`}
          {...register("email")}
        />
        {errors.email && <Form_errors_message message={errors.email.message} />}
      </div>{" "}
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
      <button type="submit" className={styles.main_btn} disabled={formLoading}>
        {isLoading && <RiLoader4Line size={20} className="animate-spin" />}
        {!isLoading ? "Sign in" : "Logging in..."}
      </button>
      {error && <Form_errors_message message={error} />}
    </form>
  );
};

export default SignInForm;
