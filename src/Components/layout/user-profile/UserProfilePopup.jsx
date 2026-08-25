import { FaXmark } from "react-icons/fa6";
import styles from "./userProfile.module.css";
import { use_auth_context } from "../../../Context/AuthProvider";
import { getUserById } from "../../../services/usersServices";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { logOut } from "../../../services/authServices";
import { useNavigate } from "react-router-dom";

const UserProfilePopup = () => {
  const { profileOpen, setProfileOpen, set_auth_open, user } =
    use_auth_context();
  const navigate = useNavigate();

  if (user)
    return (
      <>
        {/* Overlay */}
        <div
          className={`${styles.overlay} ${!profileOpen && user ? styles.close_popup : ""}`}
        ></div>

        {/* Side Panel */}
        <div
          className={`${styles.container} ${!profileOpen && user ? styles.close_popup : ""}`}
        >
          {/* Close Button */}
          <button
            className={styles.close_btn}
            onClick={() => setProfileOpen(false)}
          >
            <FaXmark size={15} />
          </button>

          {/* Content */}
          <div className={"p-7 flex-start-col h-full"}>
            <div className="w-full flex-center-col gap-5 max-w-full">
              {user.avatar ? (
                <div className="img_box">
                  <img src={user.avatar} loading="lazy" />
                </div>
              ) : (
                <div className="flex-center  hidden! md:flex! w-12 md:w-20  h-12 md:h-20 rounded-full bg-gray-light text-orange text-xl">
                  <FaRegUser size={30} />{" "}
                </div>
              )}
              <h3 className=" line-clamp-1  block">{user.email}</h3>
            </div>

            <div className="mt-auto w-full flex-between gap-5">
              {/* Sign Out Btn */}
              <button
                onClick={() => {
                  logOut();
                  navigate("/");
                }}
                type="button"
                className="flex-start  text-gray gap-2.5  hover:bg-gray-light hover:text-orange p-2"
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

export default UserProfilePopup;
