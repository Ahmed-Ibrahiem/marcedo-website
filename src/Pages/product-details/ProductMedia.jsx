import { useEffect, useMemo, useRef, useState } from "react";
import CustomSwiper from "../../Components/home/custom-swiper/CustomSwiper";
import { SwiperSlide } from "swiper/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getProductMedia } from "../../services/productDetailsServices";
const ProductMedia = ({ productData }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);
  const swiperRef = useRef(null);
  const [productsMedia, setProductMedia] = useState(null);
  // Product Data

  useEffect(() => {
    if (!productData) return;

    const getMedia = async () => {
      const media = await getProductMedia(productData.id);

      setProductMedia(media);
    };

    getMedia();
  }, [productData]);

  return (
    <div className=" h-full">
      <div className=" lg:pr-10  sticky top-24">
        {/* Start The Product Show */}
        <div className=" bg-gray-100 min-h-100 md:min-h-125 xl:min-h-160 w-full border border-border flex-center relative rounded-lg object-contain">
          {imageLoaded && (
            <Skeleton
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                translate: "-50% -50%",
                width: "90%",
                height: "90%",
              }}
            />
          )}
          <img
            src={productsMedia?.gallery[mainIndex]}
            onLoad={() => setImageLoaded(false)}
            className={`max-w-[90%] max-h-80 md:max-h-100 lg:max-h-100  opacity-100!`}
          />
        </div>

        {/* Start Gallay product */}
        <div className="mx-auto relative flex items-center justify-center max-w-full 2xl:w-full group mt-2.5">
          {/* Prev btn */}
          {productsMedia?.gallery?.length >= 4 && (
            <button
              className={`${scrollBtnStyle} -left-3.5 `}
              onClick={() => swiperRef.current.slidePrev()}
            >
              <FaAngleLeft />
            </button>
          )}

          {/* The Gallary */}
          {productsMedia?.gallery?.length >= 4 && (
            <CustomSwiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              navigation={true}
              loop={true}
              slidesPerView={4}
              breakpoints={{
                300: {
                  slidesPerView: Math.min(productsMedia.gallery.length, 3),
                },
                480: {
                  slidesPerView: Math.min(productsMedia.gallery.length, 4),
                },
              }}
              spaceBetween={10}
              className=" max-h-100 px-0 "
            >
              {productsMedia?.gallery?.map((url, index) => {
                return (
                  <SwiperSlide key={index} className={slideStyle}>
                    <div
                      onClick={() => setMainIndex(index)}
                      className={gallayStyle}
                    >
                      <ImageStyle
                        imageStyle={
                          " absolute inset-0 w-[80%] h-[80%] m-auto object-contain p-1"
                        }
                        src={url}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </CustomSwiper>
          )}

          {productsMedia?.gallery?.length < 4 && (
            <div className="w-full grid grid-cols-3 xs:grid-cols-4 gap-3">
              {productsMedia?.gallery?.map((url, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setMainIndex(index)}
                    className={`${gallayStyle} bg-gray-100 border border-border rounded-sm`}
                  >
                    <ImageStyle
                      imageStyle={
                        " absolute inset-0 w-[80%] h-[80%] m-auto object-contain p-1"
                      }
                      src={url}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Next btn */}
          {productsMedia?.gallery?.length >= 4 && (
            <button
              className={`${scrollBtnStyle} -right-3.5`}
              onClick={() => swiperRef.current.slideNext()}
            >
              <FaAngleRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const slideStyle = `
p-0! rounded-lg bg-gray-100 xs:w-[90px] sm:w-[110px] md:w-[145px] lg:w-[80px] xl:w-[90px] 2xl:w-[115px]  border border-border
`;

const gallayStyle = `
 h-[100px] xs:h-[120px] sm:h-[130px] md:h-[180px] lg:h-[110px] xl:h-[130px] 2xl:h-[170px] w-full
 flex-center cursor-pointer relative overflow-hidden 
`;

const scrollBtnStyle = `
hover:bg-orange! hover:text-white w-7.5 h-7.5 bg-gray-light! rounded-sm flex-center text-black opacity-0 group-hover:opacity-100
absolute -right-0 z-10 shadow-md
`;

const ImageStyle = ({ src, imageStyle }) => {
  const [loaded, setLoaded] = useState(true);
  return (
    <>
      {loaded && (
        <Skeleton
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
      <img
        src={src}
        onLoad={() => setLoaded(false)}
        className={imageStyle}
        style={{ opacity: loaded ? 0 : 1 }}
        alt=""
      />
    </>
  );
};

export default ProductMedia;
