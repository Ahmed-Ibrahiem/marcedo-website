import ProductItem from "../../product/product-item/ProductItem";
import "./BestSeller.css";
import { useFetchAllProducts } from "../../../Context/FetchAllProducts";
import { useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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

const BestSeller = () => {
  const { listingProducts } = useFetchAllProducts();
  const [see_all_products, set_see_all_products] = useState(false);

  return (
    <div className="prodcuts_grid">
      <div className="container">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          whileInView={{
            x: 0,
            opacity: 1,
            transition: { delay: 0.5, ease: "linear" },
          }}
          viewport={{ amount: 0.9, once: true }}
        >
          Best <span>Seller</span>
        </motion.h1>
        <motion.div
          key={see_all_products}
          className="products"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
        >
          {listingProducts &&
            listingProducts.map((product_data, index) => {
              const isNew = see_all_products && index >= 8;
              if (see_all_products) {
                return (
                  <motion.div
                    variants={isNew ? cardVariants : {}}
                    key={index}
                    className="col"
                  >
                    <ProductItem product_data={product_data} />
                  </motion.div>
                );
              } else {
                if (index < 8) {
                  return (
                    <motion.div
                      variants={cardVariants}
                      key={index}
                      className="col"
                    >
                      <ProductItem product_data={product_data} />
                    </motion.div>
                  );
                }
              }
            })}
        </motion.div>
        <button
          onClick={() => set_see_all_products((prev) => !prev)}
          className="see_all_products"
        >
          {see_all_products ? "See Less" : "See All Products"}
        </button>
      </div>
    </div>
  );
};

export default BestSeller;
