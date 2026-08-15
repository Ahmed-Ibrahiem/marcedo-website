import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import { use_auth_context } from "../../../Context/AuthProvider";
import React, { memo, useEffect, useState } from "react";
import { db } from "../../../services/firestoreConfig";
import { getDoc, collection } from "firebase/firestore";
import { getUserById } from "../../../services/usersServices";
import { FaRegUser, FaXmark } from "react-icons/fa6";
import { logOut } from "../../../services/authServices";

const Auth_menu_btn = () => {
  const { setProfileOpen, set_auth_open } = use_auth_context();
  const { user } = use_auth_context();
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const userData = await getUserById(user.uid);

      if (userData) {
        setUserData(userData);
      }
    } catch (error) {
      console.error("User Error: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUserData();
    } else {
      setUserData(null);
    }
  }, [user]);

  return (
    <>
      {!user && (
        <div
          className="flex-center gap-2.5 cursor-pointer"
          onClick={() => set_auth_open((prev) => !prev)}
        >
          <img src={assets.user_img} loading="lazy" className="w-6.25" />
          <div className="text-sm text-gray hidden! lg:block!">
            <span>Sign In</span>
            <p>Account</p>
          </div>
        </div>
      )}

      {(user && userData) && (
        <div className="relative">
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="w-8.5 lg:w-10 h-8.5 lg:h-10 rounded-[50%] bg-gray-light text-orange text-2xl font-semibold
         flex-center border-2 border-gray-light hover:bg-orange hover:text-white hover:border-orange"
          >
            {userData.avatar ? (
              <div className="img_box">
                <img src={user.avatar} loading="lazy" />
              </div>
            ) : (
              <FaRegUser size={20} />
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(Auth_menu_btn);
