import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import style from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to={"/"} className={`logo ${style.logo_part}`}>
      <div className={style.box_img}>
        <img src={assets.logo_img} alt="" />
      </div>
      <h2>Marcedo</h2>
    </Link>
  );
};

export default Logo;
