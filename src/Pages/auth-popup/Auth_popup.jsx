import styles from "./Auth_popup.module.css";
import { use_auth_context } from "../../Context/AuthProvider";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { FaXmark } from "react-icons/fa6";
import LoginWithGoogleBtn from "./LoginWithGoogleBtn";
import { useState } from "react";

const Auth_popup = () => {
  const { sign_mode, set_sign_mode, auth_open, set_auth_open } =
    use_auth_context();

  const [formLoading, setFormLoading] = useState(false);

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
          <FaXmark size={15} />
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
          {sign_mode === "sign_in" ? (
            <SignInForm
              formLoading={formLoading}
              setFormLoading={setFormLoading}
            />
          ) : (
            <SignUpForm
              formLoading={formLoading}
              setFormLoading={setFormLoading}
            />
          )}

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.divider_line}></div>
            <div className={styles.divider_text}>Or</div>
          </div>

          {/* Create Account */}
          <button
            type="button"
            className={styles.toggleSignMode}
            disabled={formLoading}
            onClick={() => {
              if (formLoading) return;
              set_sign_mode((prev) =>
                prev == "sign_in" ? "create_account" : "sign_in",
              );
            }}
          >
            {sign_mode === "sign_in" ? "Create An Account" : "Sign in"}
          </button>

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.divider_line}></div>
            <div className={styles.divider_text}>Or</div>
          </div>

          {/* Login With Google*/}
          <LoginWithGoogleBtn
            formLoading={formLoading}
            setFormLoading={setFormLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Auth_popup;
