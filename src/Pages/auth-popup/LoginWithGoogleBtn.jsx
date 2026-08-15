import { useEffect, useState } from "react";
import { loginWithGoogle } from "../../services/authServices";
import styles from "./Auth_popup.module.css";
import { RiLoader4Line } from "react-icons/ri";
import Form_errors_message from "../../Components/ui/Errors/Form_errors_message";
import { use_auth_context } from "../../Context/AuthProvider";

const LoginWithGoogleBtn = ({ formLoading, setFormLoading }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth_open, set_auth_open } = use_auth_context();

  const handleClick = async () => {
    if (formLoading) return;

    setLoading(true);
    setFormLoading(true);
    try {
      await loginWithGoogle();
      set_auth_open(false);
    } catch (err) {
      // popup-closed-by-user is not error
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Something went wrong, please try again");
      }
      console.log(err);
    } finally {
      setFormLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setError("");
  }, [auth_open]);

  return (
    <>
      <button
        type="button"
        className={`${styles.toggleSignMode} flex-center gap-2.5`}
        onClick={() => {
          handleClick();
        }}
        disabled={formLoading}
      >
        {loading && <RiLoader4Line size={20} className="animate-spin" />}
        <span>Continue with Google</span>{" "}
        <img
          src="/assets/images/google.png"
          className="w-7 h-7 object-contain "
          alt=""
        />
      </button>
      {error && <Form_errors_message message={error} />}
    </>
  );
};

export default LoginWithGoogleBtn;
