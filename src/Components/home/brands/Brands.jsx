import { assets } from "../../../assets/assets";
import { use_notification_context } from "../../../Context/NotificationProvider";
import "./Brands.css";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "linear",
    },
  },
};

const Brands = () => {
  const { add_message } = use_notification_context();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
      viewport={{ amount: 0.2, once: true }}
      className="brands"
    >
      <div className="container">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
          viewport={{ amount: 0.8, once: true }}
        >
          Popular Brands
        </motion.h1>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.8, once: true }}
          className="brands_grid"
        >
          <motion.div variants={cardVariants} className="brand brand_one">
            <img src="/assets/images/brand_one.png" loading="lazy" alt="" />
            <p>ACELOS 3D</p>
            <h1>VR Headset and Controllers</h1>
            <button
              onClick={() =>
                add_message({ title: "This Page Will Coming Soon" })
              }
            >
              Shop Now
            </button>
          </motion.div>
          <motion.div variants={cardVariants} className="brand brand_two">
            <img src="/assets/images/brand_two.png" loading="lazy" alt="" />
            <h1>MASSAGE CHAIR LUXURY</h1>
            <p>Fuka Relax Full Body Massage Chair</p>
            <button
              onClick={() =>
                add_message({ title: "This Page Will Coming Soon" })
              }
            >
              Shop Now
            </button>
          </motion.div>
          <motion.div variants={cardVariants} className="brand brand_three">
            <img
              src="/assets/images/brand_three1.png"
              className="image1"
              alt=""
              loading="lazy"
            />
            <img
              src="/assets/images/brand_three2.png"
              className="image2"
              alt=""
              loading="lazy"
            />
            <p>OKODo</p>
            <h1>hero 11+ black</h1>
            <button
              onClick={() =>
                add_message({ title: "This Page Will Coming Soon" })
              }
            >
              Shop Now
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Brands;
