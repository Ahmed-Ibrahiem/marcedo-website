import { assets } from "../../../assets/assets";
import { use_auth_context } from "../../../Context/AuthProvider";
import style from "./Auth_menu_btn.module.css";

const Auth_menu_btn = () => {
  const { set_auth_open } = use_auth_context();
  const { user_info } = use_auth_context();
  return (
    <>
      {!user_info.email && !user_info.phone && (
        <div
          className={style.sign_in_part}
          onClick={() => set_auth_open((prev) => !prev)}
        >
          <img src={assets.user_img} alt="" />
          <div className={style.sign_in}>
            <span>Sign In</span>
            <p>Account</p>
          </div>
        </div>
      )}

      {(user_info.email || user_info.phone) && (
        <button className={style.profile_img}>
          {user_info.email && <p>{user_info.email.charAt(0)}</p>}
          {!user_info.email && user_info.phone && (
            <i className="fa-solid fa-user"></i>
          )}
        </button>
      )}
    </>
  );
};

export default Auth_menu_btn;
