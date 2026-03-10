import { Link } from "react-router-dom";
import style from "./Coming_soon.module.css";

const Coming_soon = () => {
  return (
    <div className={style.container}>
      <img src="/src/assets/coming_soon.png" alt="" />
      <Link className={style.go_back} to={"/home"}>
        Home Page
      </Link>
    </div>
  );
};

export default Coming_soon;
