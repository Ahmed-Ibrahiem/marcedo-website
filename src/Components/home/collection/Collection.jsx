import { Link } from "react-router-dom";
import { use_notification_context } from "../../../Context/NotificationProvider";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";

const collections = [
  {
    title: "Dress Collection",
    desc: "Explore a curated range of elegant and versatile dresses crafted to elevate your confidence for every memorable occasion.",
    url: "/shop/dresses",
    thumbnail:
      "https://res.cloudinary.com/dsqaber42/image/upload/v1787369693/Gemini_Generated_Image_bfjnqbbfjnqbbfjn_kxik10.jpg",
  },
  {
    title: "Shirt Collection",
    desc: "Discover tailored and casual shirts designed with premium fabrics to offer unmatched comfort and timeless everyday sophistication.",
    url: "/shop/shirts",
    thumbnail:
      "https://res.cloudinary.com/dsqaber42/image/upload/v1787369695/Gemini_Generated_Image_1s1reu1s1reu1s1r_yxawwn.jpg",
  },
  {
    title: "Sweater Collection",
    desc: "Wrap yourself in cozy warmth with modern knitwear blends tailored to keep you effortlessly stylish throughout the cold season.",
    url: "/shop/sweaters",
    thumbnail:
      "https://res.cloudinary.com/dsqaber42/image/upload/v1787369695/Gemini_Generated_Image_hyohx8hyohx8hyoh_ubszx0.jpg",
  },
  {
    title: "T-shirt Collection",
    desc: "Upgrade your essential wardrobe with soft, high-quality t-shirts engineered for maximum breathability and all-day comfort.",
    url: "/shop/t-shirts",
    thumbnail:
      "https://res.cloudinary.com/dsqaber42/image/upload/v1787369694/Gemini_Generated_Image_aljn31aljn31aljn_t30fhu.jpg",
  },
  {
    title: "Sport Collection",
    desc: "Power your workouts with high-performance athletic gear meticulously built to balance functionality, flexibility, and modern aesthetic.",
    url: "/shop/sporty-dresses",
    thumbnail:
      "https://res.cloudinary.com/dsqaber42/image/upload/v1787369695/Gemini_Generated_Image_llrvuollrvuollrv_evnofv.jpg",
  },
];

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

const valueAtPercentage = ({ from, to, percentage }) =>
  from + (to - from) * percentage;

const STICKY_TOP = 40;

export const Collection = () => {
  const { add_message } = use_notification_context();

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const innerRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    const inners = innerRefs.current;
    const container = containerRef.current;

    let ticking = false;

    const recalculateGrid = () => {
      const cardHeight = cards[0]?.clientHeight || 0;
      container.style.setProperty("--cards-count", cards.length);
      container.style.setProperty("--card-height", `520px`);
    };

    cards.forEach((card, index) => {
      const offsetTop = STICKY_TOP + 20 + index * 20;
      card.style.paddingTop = `${offsetTop}px`;
    });

    const update = () => {
      cards.forEach((card, index) => {
        // The last card has no next card to react to, so skip it
        if (index === cards.length - 1) return;

        const offsetTop = STICKY_TOP + 20 + index * 20;
        const offsetBottom = window.innerHeight - card.clientHeight;
        const nextCard = cards[index + 1];
        const inner = inners[index];
        const toScale = 1 - (cards.length - 1 - index) * 0.1;

        const rect = nextCard.getBoundingClientRect();
        const start = window.innerHeight - offsetBottom;
        const end = offsetTop;
        const percentage = clamp((start - rect.top) / (start - end || 1));

        inner.style.scale = valueAtPercentage({
          from: 1,
          to: toScale,
          percentage,
        });
        inner.style.filter = `brightness(${valueAtPercentage({
          from: 1,
          to: 0.6,
          percentage,
        })})`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      recalculateGrid();
      update();
    };

    // Initial measurement — wait for fonts to be ready first
    const init = () => {
      recalculateGrid();
      update();
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(init);
    } else {
      init();
    }

    // Watch the first card for ANY size change (images, fonts, content, anything)
    const resizeObserver = new ResizeObserver(() => {
      recalculateGrid();
      update();
    });
    if (cards[0]) resizeObserver.observe(cards[0]);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="collections-area my-20 mb-65">
        <div className="container">
          <motion.h1
            className="text-3xl text-black-lite font-semibold mb-3.5 "
            initial={{ x: -100, opacity: 0 }}
            whileInView={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.5, ease: "linear" },
            }}
            viewport={{ amount: 0.5, once: true }}
          >
            Our <span className="text-orange">Collections</span>
          </motion.h1>
          <motion.p
            className=" text-gray text-sm "
            initial={{ x: -100, opacity: 0 }}
            whileInView={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.5, ease: "linear" },
            }}
            viewport={{ amount: 0.5, once: true }}
          >
            Explore our thoughtfully curated collections, designed to blend
            timeless elegance with everyday versatility. From sleek modern
            tailoring to essential athletic gear, each piece is crafted with
            premium fabrics and precise attention to detail to elevate your
            personal style effortlessly.
          </motion.p>

          <div
            ref={containerRef}
            className="w-full mx-auto grid gap-x-0 gap-y-40 max-[960px]:gap-y-10 grid-rows-[repeat(var(--cards-count),var(--card-height))]"
          >
            {collections.map((item, index) => (
              <motion.div
                initial={{
                  opacity: index === 0 ? 0 : 1,
                  y: index === 0 ? 30 : 0,
                }}
                whileInView={{ opacity: 1 , y: 0}}
                viewport={{ amount: 0.5, once: true }}
                className="card sticky top-10 "
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                <div
                  className="card__inner shadow-sm flex-col-reverse md:flex-row will-change-transform bg-gray-100 rounded-[5px] flex overflow-hidden origin-[center_top] "
                  ref={(el) => (innerRefs.current[index] = el)}
                >
                  <div className="card_content flex-center-col md:grow">
                    <div className="w-full p-5 md:p-10  flex-start-col gap-7.5">
                      <h1 className="text-2xl md:text-3xl font-semibold">
                        {item.title}
                      </h1>
                      <p className="text-gray text-sm w-[80%]">{item.desc}</p>
                      <Link
                        className="px-3.5 py-1.5 max-md:text-sm  md:px-5 md:py-2.5 bg-orange text-white! flex-center gap-1.5 rounded-sm border-2 border-orange hover:text-orange! hover:bg-transparent"
                        to={item.url}
                      >
                        <span>Shop Now</span>{" "}
                        <GoArrowUpRight className="text-2xl" />
                      </Link>
                    </div>
                  </div>

                  <div className="img-box max-h-65  md:h-full  md:max-h-130 md:w-[60%] md:min-w-[60%] overflow-hidden flex-center">
                    <img
                      src={item.thumbnail}
                      className="max-w-full max-h-full"
                      alt=""
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* <div className="h-[40vh]"></div> */}
        </div>
      </div>
    </>
  );
};
