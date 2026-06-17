import { Link } from "react-router-dom";
import style from "./Our_banner.module.css";
import { motion } from "framer-motion";
import { FaAngleRight } from "react-icons/fa6";

const Our_banner = ({ page_data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className={style.hero}
    >
      <h1>{page_data.title}</h1>
      <div>
        <Link to={"/home"}>Home</Link>
        <FaAngleRight />
        <p>{page_data.title}</p>
      </div>
    </motion.div>
  );
};

export default Our_banner;
