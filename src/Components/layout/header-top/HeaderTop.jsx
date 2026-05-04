import "./HeaderTop.css";
import { motion } from "framer-motion";

const HeaderTop = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut" }}
      className="header_top"
    >
      <span className="special">Special</span>
      <p className="discount_text">
        Get <span className="discount">10</span>% <b>DISCOUNT</b> for first
        order
      </p>
      <button className="register_now">Register Now</button>
    </motion.div>
  );
};

export default HeaderTop;
