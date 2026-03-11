import { useCountriesAndLanguagesContext } from "../../../Context/CountriesAndLaguagesContext";
import "./HeaderMiddle.css";
import Country_menu from "../header-menus/Country_menu";
import Language_menu from "../header-menus/Language_menu";

// Middle section of the header — contains navigation links and country/language selectors
const HeaderMiddle = () => {
  // Get current country/language values and their update handlers from context
  const {
    currentCountry,
    currentLanguage,
    handleSetCurrentCountry,
    handleSetCurrentLanguage,
  } = useCountriesAndLanguagesContext();

  return (
    <div className="header_middle">
      <div className="container">
        {/* Left side — quick navigation links */}
        <div className="left">
          <ul className="nav_part">
            <li>
              <a href="##">
                <i className="fa-solid fa-store"></i>
                <p>Sall Of Marcedo</p>
              </a>
            </li>
            <li>
              <a href="##">
                <i className="fa-solid fa-bag-shopping"></i>
                <p>Order Traking</p>
              </a>
            </li>
            <li>
              <a href="##">
                <i className="fa-solid fa-eye"></i>
                <p>Resently Viewed</p>
              </a>
            </li>
          </ul>
        </div>

        {/* Right side — country and language selectors */}
        <div className="right">
          <Country_menu
            currentCountry={currentCountry}
            handleSetCurrentCountry={handleSetCurrentCountry}
          />

          <Language_menu
            currentLanguage={currentLanguage}
            handleSetCurrentLanguage={handleSetCurrentLanguage}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;