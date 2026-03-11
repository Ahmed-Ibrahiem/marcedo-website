import { useRef, useState } from "react";
import { countries } from "../../../assets/assets";
import useOutside_click from "../../../Hooks/Outside_click";
import { use_notification_context } from "../../../Context/NotificationProvider";

// Component for selecting the current country from a dropdown menu
const Country_menu = ({ currentCountry, handleSetCurrentCountry }) => {
  // Controls whether the dropdown is open or closed
  const [country_menu_state, setCountry_menu_state] = useState(false);

  // Get the function to show a notification message
  const { add_message } = use_notification_context();

  // Ref to detect clicks outside the menu and close it
  const menu_ref = useRef(null);
  useOutside_click(menu_ref, () => setCountry_menu_state(false));

  return (
    <div
      ref={menu_ref}
      data-menu_type="menu"
      className={`country ${country_menu_state ? "menu_open" : ""}`}
      // Toggle the dropdown on click
      onClick={() => setCountry_menu_state((prev) => (prev ? false : true))}
    >
      {/* Display the currently selected country */}
      <div className="current_option">{currentCountry}</div>

      {/* Arrow icon that indicates the dropdown */}
      <i className="fa-solid fa-angle-down"></i>

      {/* Dropdown list of available countries */}
      <div
        className={`country_options options ${
          country_menu_state ? "open_menu" : ""
        }`}
      >
        {countries.map((country, index) => {
          return (
            <span
              onClick={() => {
                // Update the selected country
                handleSetCurrentCountry(country);
                // Show a "coming soon" notification since the feature is not ready yet
                add_message({ title: "This Feature Will Comming Soon" });
              }}
              key={index}
              data-country_name={country}
            >
              {country}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Country_menu;
