import { Link } from "react-router-dom";
import { popular_categories } from "../../../assets/assets";
import "./PopularCategories.css";
import { use_notification_context } from "../../../Context/NotificationProvider";
import { motion } from "framer-motion";

const boxVeriants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "linear",
    },
  },
};

const containerVeriants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "linear",
      staggerChildren: 0.2,
    },
  },
};

const PopularCategories = () => {
  const { add_message } = use_notification_context();
  return (
    <section className="popular_categorais">
      <div className="container">
        <motion.h3
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 , transition: {delay: 0.6} }}
          viewport={{ amount: 0.9, once: true }}
        >
          Popular <span>Categories</span>
        </motion.h3>
        <motion.div
          variants={containerVeriants}
          initial="hidden"
          whileInView={"visible"}
          viewport={{ amount: 0.8, once: true }}
          className="box_container"
        >
          {popular_categories.map((category, index) => {
            return (
              <motion.div
                variants={boxVeriants}
                onClick={() => {
                  if (index != 2)
                    add_message({
                      title:
                        "This Page Will Coming Soon , You Can Visit This Page",
                      link: {
                        url: "/categories/dresses",
                        name: "Dresses Page",
                      },
                    });
                }}
                key={index}
                className="box"
              >
                <Link to={index == 2 && "/categories/dresses"}>
                  <div className="box-img">
                    <img src={category.img} alt="" />
                  </div>
                  <p>{category.category_name}</p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCategories;
