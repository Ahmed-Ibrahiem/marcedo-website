import { useState } from "react";
import styles from "./Auth_popup.module.css";
import { use_auth_context } from "../../Context/Auth_provider";
import Form_errors_message from "../../Components/Errors/Form_errors_message";

const Auth_popup = () => {
  const [show_password, set_show_password] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { sign_mode, set_sign_mode, auth_open, set_auth_open } =
    use_auth_context();

  const { register, control, handleSubmit, errors, onSubmit } =
    use_auth_context();

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${!auth_open ? styles.close_popup : ""}`}
      ></div>

      {/* Side Panel */}
      <div
        className={`${styles.container} ${!auth_open ? styles.close_popup : ""}`}
      >
        {/* Close Button */}
        <button
          className={styles.close_btn}
          onClick={() => set_auth_open(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Content */}
        <div className={styles.content}>
          {/* Title */}
          <div className={styles.title_section}>
            <h1 className={styles.title}>
              {sign_mode === "sign_in" ? "Sign In" : "Create Account"}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {sign_mode == "create_account" && (
              <>
                {/* First Name */}
                <div className={styles.form_group}>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={`${styles.input}`}
                    {...register("first_name")}
                  />
                </div>

                {/* Last Name */}
                <div className={styles.form_group}>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={`${styles.input}`}
                    {...register("last_name")}
                  />
                </div>
              </>
            )}

            {/* Email Input */}
            <div className={styles.form_group}>
              <input
                type="text"
                placeholder={
                  sign_mode == "sign_in" ? "Email or Phone Number*" : "Email*"
                }
                className={`${styles.input}`}
                {...register("email")}
              />
              {errors.email && (
                <Form_errors_message message={errors.email.message} />
              )}
            </div>

            {/* Phone Number Input */}
            {sign_mode == "create_account" && (
              <div className={styles.form_group}>
                <input
                  type="tel"
                  placeholder="Phone Number*"
                  className={`${styles.input}`}
                  {...register("phone")}
                />
                {errors.phone && (
                  <Form_errors_message message={errors.phone.message} />
                )}
              </div>
            )}

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
                  {show_password ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </button>
              </div>
              {errors.password && (
                <Form_errors_message message={errors.password.message} />
              )}
            </div>

            {/* Forgot Password */}
            {sign_mode == "sign_in" && (
              <div className={styles.forgot_password_container}>
                <button type="button" className={styles.forgot_password_link}>
                  Forgot your password?
                </button>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              //   disabled={isLoading}
              className={styles.main_btn}
            >
              {/* {isLoading && <div className={styles.spinner}></div>} */}
              {!isLoading && sign_mode == "sign_in" && "Sign in"}
              {!isLoading && sign_mode != "sign_in" && "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.divider_line}></div>
            <div className={styles.divider_text}>Or</div>
          </div>

          {/* Create Account */}
          <button
            type="button"
            className={styles.submain_btn}
            onClick={() => {
              set_sign_mode((prev) =>
                prev == "sign_in" ? "create_account" : "sign_in",
              );
            }}
          >
            {sign_mode === "sign_in" ? "Create An Account" : "Sign in"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Auth_popup;
