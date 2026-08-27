import { createContext,  useContext, useEffect, useState } from "react";
import {  getUserById } from "../services/usersServices";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firestoreConfig";

// Create a context for authentication
const auth_context = createContext();

function getErrorMessage(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Something went wrong. Try logging in instead, or use a different email.";
    case "auth/invalid-email":
      return "Invalid email format";
    case "auth/weak-password":
      return "Password must be at least 6 characters";
    case "auth/invalid-credential":
      return "Incorrect email or password";
    case "auth/too-many-requests":
      return "Too many attempts, please try again later";
    case "auth/popup-closed-by-user":
      return ""; // user cancelled themselves, no need to show an error
    default:
      return "Something went wrong, please try again";
  }
}

// Auth provider component to wrap around app
const Auth_provider = ({ children }) => {
  // State to manage current sign mode: 'sign_in' or 'create_account'
  const [sign_mode, set_sign_mode] = useState("sign_in");
  // State to control authentication modal visibility
  const [auth_open, set_auth_open] = useState(false);
  // State to indicate loading during API calls
  const [is_loading, set_is_loading] = useState(true);
  // State to storage current user state
  const [user, setUser] = useState(null);

  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const getUser = async () => {
        try {
          if (currentUser) {
            const userData = await getUserById(currentUser.uid);
            
            setUser(userData);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Get user error:", error);
        } finally {
          set_is_loading(false);
        }
      };
      getUser();
    });

    return unsubscribe;
  }, []);

  // Context value to be shared
  const value = {
    user,
    sign_mode,
    set_sign_mode,
    auth_open,
    set_auth_open,
    getErrorMessage,
    is_loading,
    profileOpen,
    setProfileOpen,
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
