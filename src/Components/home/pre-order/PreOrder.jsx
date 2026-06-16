import { assets } from "../../../assets/assets";
import "./PerOrder.css";
import { motion } from "framer-motion";
const PreOrder = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.8, delay: 0.3 } }}
      viewport={{ once: true }}
      className="pre_order"
    >
      <div className="container">
        <div className="text1">
          <h2>PRE ORDER</h2>
          <span>BE AMONG THE FIRST TO OWN IT!</span>
          <p>FROM 35,000 EGP</p>
        </div>
        <div className="image_container">
          <img src={assets.gaming_monitor} alt="" loading="lazy" />
        </div>
        <div className="text2">
          <div>
            <p>180Hz Curved Ultra</p>
            <p>Gaming Monitor</p>
          </div>
          <p>Dive Into An Unmatched Gaming Experience </p>
        </div>
        <a href="##">Discover Now</a>
      </div>
    </motion.div>
  );
};

export default PreOrder;
