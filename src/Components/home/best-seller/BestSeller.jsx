import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import ProductCard from "../../product/product-item/ProductCard";

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

const BestSeller = ({ bestSellerProducts }) => {
  return (
    <div className="container my-15 ">
      {bestSellerProducts && (
        <div className=" w-full! flex-start-col gap-8">
          <motion.h1
            className="text-3xl text-black-lite font-semibold "
            initial={{ x: -100, opacity: 0 }}
            whileInView={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.5, ease: "linear" },
            }}
            viewport={{ amount: 0.9, once: true }}
          >
            Best <span className="text-orange">Seller</span>
          </motion.h1>
          <motion.div
            className="w-full grid  xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-7.5 "
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1, once: true }}
          >
            {bestSellerProducts.map((productData, index) => {
              return (
                <motion.div variants={cardVariants} key={index} className="col">
                  <ProductCard product={productData} />
                </motion.div>
              );
            })}
          </motion.div>
          <button className="px-5 py-2.5 font-semibold text-white bg-orange! mx-auto my-10 border-orange border-2 hover:text-orange hover:bg-transparent! rounded-sm">
            See All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(BestSeller);
