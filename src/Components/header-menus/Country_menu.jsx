import { useRef, useState } from "react";
import { countries } from "../../assets/assets";
import useOutside_click from "../../Hooks/Outside_click";
import { use_notification_context } from "../../Context/Notification_provider";
const Country_menu = ({ currentCountry, handleSetCurrentCountry }) => {
  const [country_menu_state, setCountry_menu_state] = useState(false);
  const { add_message } = use_notification_context();

  const menu_ref = useRef(null);
  useOutside_click(menu_ref, () => setCountry_menu_state(false));

  return (
    <div
      ref={menu_ref}
      data-menu_type="menu"
      className={`country ${country_menu_state ? "menu_open" : ""}`}
      onClick={() => setCountry_menu_state((prev) => (prev ? false : true))}
    >
      <div className="current_option">{currentCountry}</div>
      <i className="fa-solid fa-angle-down"></i>
      <div
        className={`country_options options ${
          country_menu_state ? "open_menu" : ""
        }`}
      >
        {countries.map((country, index) => {
          return (
            <span
              onClick={() => {
                handleSetCurrentCountry(country);
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
