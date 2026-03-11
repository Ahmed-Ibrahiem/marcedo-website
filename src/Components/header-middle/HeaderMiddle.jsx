import { useCountriesAndLanguagesContext } from "../../Context/CountriesAndLaguagesContext";
import "./HeaderMiddle.css";
import Country_menu from "../header-menus/Country_menu";
import Language_menu from "../header-menus/Language_menu";

const HeaderMiddle = () => {
  const {
    currentCountry,
    currentLanguage,
    handleSetCurrentCountry,
    handleSetCurrentLanguage,
  } = useCountriesAndLanguagesContext();

  return (
    <div className="header_middle">
      <div className="container">
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
