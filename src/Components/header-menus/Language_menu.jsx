import { useRef, useState } from "react";
import { languages } from "../../assets/assets";
import useOutside_click from "../../Hooks/Outside_click";
import { use_notification_context } from "../../Context/Notification_provider";
const Language_menu = ({ currentLanguage, handleSetCurrentLanguage }) => {
  const [language_menu_state, setLanguage_menu_state] = useState(false);
  const { add_message } = use_notification_context();

  const menu_ref = useRef(null);
  useOutside_click(menu_ref, () => setLanguage_menu_state(false));
  return (
    <div
      ref={menu_ref}
      data-menu_type="menu"
      className={`languages ${language_menu_state ? "menu_open" : ""}`}
      onClick={() => {
        setLanguage_menu_state((prev) => {
          return prev ? false : true;
        });
      }}
    >
      <div className="current_option">
        <img src={currentLanguage.language_flag} alt="" />
        <span>{currentLanguage.language_name}</span>
      </div>
      <i className="fa-solid fa-angle-down"></i>
      <div
        className={`languages_options options ${
          language_menu_state ? "open_menu" : ""
        }`}
      >
        {languages.map((language, index) => {
          return (
            <span
              data-language_type={language.language_name}
              onClick={() => {
                handleSetCurrentLanguage(
                  language.language_name,
                  language.language_flag,
                );
                add_message({title: "This Feature Will Coming Soon"})
              }}
              key={index}
            >
              {language.language_name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Language_menu;
