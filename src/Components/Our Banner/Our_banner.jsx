import { Link } from "react-router-dom";
import style from "./Our_banner.module.css";

const Our_banner = ({ page_data }) => {
  return (
    <div className={style.hero}>
      <h1>{page_data.title}</h1>
      <div>
        <Link to={"/home"}>Home</Link>
        <i className="fa-solid fa-angle-right"></i>
        <p>{page_data.title}</p>
      </div>
    </div>
  );
};

export default Our_banner;
