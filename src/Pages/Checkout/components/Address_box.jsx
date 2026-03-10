import Country_box from "./Country_box";
import style from "../Css/Address_box.module.css";
import Full_name from "./Full_name";
import Suggestions_part from "./Suggestions_part";
import Location_details from "./Location_details";
import Save_to_next from "./Save_to_next";

const Address_box = () => {
  return (
    <>
      <Country_box />
      <div className={style.address_info}>
        {/* --- Full Name Section --- */}
        <Full_name />

        {/* --- Address Input with Suggestion Dropdown --- */}
        <Suggestions_part />

        {/* --- Location Details (City, State, Zip) --- */}
        <Location_details />

        {/* --- Save Information Checkbox --- */}
        <Save_to_next />
      </div>
    </>
  );
};

export default Address_box;
