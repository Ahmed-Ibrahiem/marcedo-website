import { FaUser } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import { use_auth_context } from "../../../Context/AuthProvider";
import React, { memo } from "react";

const Auth_menu_btn = () => {
  const { set_auth_open } = use_auth_context();
  const { user_info } = use_auth_context();
  return (
    <>
      {!user_info && (
        <div
          className="flex-center gap-2.5 cursor-pointer"
          onClick={() => set_auth_open((prev) => !prev)}
        >
          <img src={assets.user_img} alt="" className="w-6.25" />
          <div className="text-sm text-gray hidden! lg:block!">
            <span>Sign In</span>
            <p>Account</p>
          </div>
        </div>
      )}

      {(user_info?.email || user_info?.phone) && (
        <button
          className="w-8.5 lg:w-10 h-8.5 lg:h-10 rounded-[50%] bg-gray-light text-orange text-2xl font-semibold
         flex-center border-2 border-gray-light hover:bg-orange"
        >
          {user_info.email && <p>{user_info.email.charAt(0)}</p>}
          {!user_info.email && user_info.phone && (
            <FaUser className="text-lg!" />
          )}
        </button>
      )}
    </>
  );
};

export default React.memo(Auth_menu_btn);
