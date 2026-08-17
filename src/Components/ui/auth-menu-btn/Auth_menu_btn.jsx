import { use_auth_context } from "../../../Context/AuthProvider";
import React, { memo } from "react";
import { FaRegUser } from "react-icons/fa6";

const Auth_menu_btn = () => {
  const { setProfileOpen, set_auth_open } = use_auth_context();
  const { user } = use_auth_context();

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

      {user && (
        <div className="relative">
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="w-8.5 lg:w-10 h-8.5 lg:h-10 rounded-[50%] bg-gray-light text-orange text-2xl font-semibold
         flex-center border-2 border-gray-light hover:bg-orange hover:text-white hover:border-orange"
          >
            {user.avatar ? (
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
