import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomSwiper from "../../../Components/home/custom-swiper/CustomSwiper";
import { SwiperSlide } from "swiper/react";
import { IoCart } from "react-icons/io5";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { getRelatedProducts } from "../../../services/productDetailsServices";
import ProductCard from "../../../Components/product/product-item/ProductCard";

const RecommendedProducts = ({ productData }) => {
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const product = productData;

  useEffect(() => {
    if (!productData) return;

    const getRelated = async () => {
      if (!productData.relatedIds.length) return;
      const products = await getRelatedProducts(productData.relatedIds);
      if (!products) return null;
      setRelatedProducts(products);
    };

    getRelated();
  }, [productData]);

  return (
    <>
      {relatedProducts && (
        <div className="w-full h-fit px-10 mt-30">
          <div className="w-full">
            <CustomSwiper
              className="cursor-auto!"
              slidesPerView={4}
              navigation={true}
              loop={relatedProducts?.length > 4}
              breakpoints={{
                320: { slidesPerView: 1 },
                540: { slidesPerView: 2 },
                720: { slidesPerView: 3 },
                960: { slidesPerView: 4 },
                1550: { slidesPerView: 5 },
              }}
            >
              {relatedProducts.map((product, index) => {
                return (
                  <SwiperSlide className="cursor-grab!">
                    <ProductCard product={product} />
                  </SwiperSlide>
                );
              })}
            </CustomSwiper>
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendedProducts;
