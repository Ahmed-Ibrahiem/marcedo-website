import { Link } from "react-router-dom";
import "./PopularCategories.css";
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

export const popular_categories = [
  {
    category_name: "T-shirt",
    img: "/assets/images/baby-boy-dress-stroke-rounded 1.png",
    category_page: "/shop/t-shirt" ,
  },
  {
    category_name: "Apple",
    img: "/assets/images/apple-logo.png",
    category_page: "/shop/apple" ,
  },
  {
    category_name: "Dress",
    img: "/assets/images/dress.png",
    category_page: "/shop/dresses",
  },
  {
    category_name: "Smart Watch",
    img: "/assets/images/wristwatch.png",
    category_page: "/shop/smartwatch" ,
  },
  {
    category_name: "Parfum",
    img: "/assets/images/perfume.png",
    category_page: "/shop/parfum",
  },
  {
    category_name: "Electronic",
    img: "/assets/images/electronic.png",
    category_page:"/shop/electronics" ,
  },
];

const PopularCategories = () => {
  
  return (
    <section className="popular_categorais">
      <div className="container">
        <motion.h3
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { delay: 0.6 } }}
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
              <motion.div variants={boxVeriants} key={index} className="box">
                <Link to={category.category_page}>
                  <div className="box-img">
                    <img src={category.img} alt="" loading="lazy" />
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
