import { Link } from "react-router-dom";
import { useHeaderBottomContext } from "../../../Context/HeaderBottomContext";

const NavbarMenu = ({ menu_style, active_class }) => {
  const { menu, setMenu, nav_bar_data } = useHeaderBottomContext();

  return (
    <ul className={menu_style}>
      {nav_bar_data.map((data, index) => {
        return (
          <Link
            to={data.url}
            key={index}
            className={menu == data.title ? active_class : ""}
            onClick={() => setMenu(data.title)}
          >
            {data.title}
          </Link>
        );
      })}
    </ul>
  );
};

export default NavbarMenu;
