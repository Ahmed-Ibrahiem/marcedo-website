import { useRef, useState } from "react";
import { languages } from "../../../assets/assets";
import useOutside_click from "../../../Hooks/Outside_click";
import { use_notification_context } from "../../../Context/NotificationProvider";

// Component for selecting the app language from a dropdown menu
const Language_menu = ({ currentLanguage, handleSetCurrentLanguage }) => {
  // Controls whether the dropdown is open or closed
  const [language_menu_state, setLanguage_menu_state] = useState(false);

  // Get the function to show a notification message
  const { add_message } = use_notification_context();

  // Ref to detect clicks outside the menu and close it
  const menu_ref = useRef(null);
  useOutside_click(menu_ref, () => setLanguage_menu_state(false));

  return (
    <div
      ref={menu_ref}
      data-menu_type="menu"
      className={`languages ${language_menu_state ? "menu_open" : ""}`}
      // Toggle the dropdown on click
      onClick={() => {
        setLanguage_menu_state((prev) => {
          return prev ? false : true;
        });
      }}
    >
      {/* Display the currently selected language with its flag */}
      <div className="current_option">
        <img src={currentLanguage.language_flag} alt="" />
        <span>{currentLanguage.language_name}</span>
      </div>

      {/* Arrow icon that indicates the dropdown */}
      <i className="fa-solid fa-angle-down"></i>

      {/* Dropdown list of available languages */}
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
                // Update the selected language
                handleSetCurrentLanguage(
                  language.language_name,
                  language.language_flag,
                );
                // Show a "coming soon" notification since the feature is not ready yet
                add_message({ title: "This Feature Will Coming Soon" });
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
