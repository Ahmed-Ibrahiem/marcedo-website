import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import style from "./Logo.module.css";

const Logo = ({ logoStyle }) => {
  return (
    <Link
      to={"/"}
      className={`logo ${style.logo_part} ${logoStyle ? logoStyle : ""}`}
    >
      <div className={style.box_img}>
        <img src={assets.logo_img} alt="" loading="lazy" />
      </div>
      <h2>Marcedo</h2>
    </Link>
  );
};

export default Logo;
