import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import "./Collection.css";
import { use_notification_context } from "../../../Context/NotificationProvider";
import { motion } from "framer-motion";

export const Collection = () => {
  const { add_message } = use_notification_context();
  const collection_list = [
    {
      title: "Dress Collection",
      image: assets.dress_collection,
      type: "dress",
    },
    {
      title: "Shirt Collection",
      image: assets.shirt_collection,
      type: "shirt",
    },
    {
      title: "Sweeter Collection",
      image: assets.sweeter_collection,
      type: "sweeter",
    },
    {
      title: "Blazer Collection",
      image: assets.blazer_collection,
      type: "blazer",
    },
    {
      title: "T-shirt Collection",
      image: assets.t_shirt_collection,
      type: "t_shirt",
    },
    {
      title: "Sport Collection",
      image: assets.sport_collectoin,
      type: "sport",
    },
  ];

  const create_collection = (coll) => {
    return (
      <Link
        to={coll.type == "dress" && "/categories/dresses"}
        key={coll.type}
        className={coll.type}
      >
        <div className="dark_style"></div>
        <div className="style"></div>
        <img src={coll.image} alt="" />
        <h1>{coll.title}</h1>
        <button
          onClick={() => {
            if (coll.type != "dress")
              add_message({ title: "This Feature Will Coming Soon" });
          }}
          className="collection_btn"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </Link>
    );
  };

  return (
    <div className="collection">
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.1, once: true }}
        >
          Our Collection
        </motion.h1>
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 0.4 } }}
          viewport={{ amount: 0.5, once: true }}
        >
          By having categories of colthes, we ensure that every customer can
          find the right choice for their style and needs, so that they can look
          confident and appropriate for different occasions or moods.
        </motion.p>
        <Link
          onClick={() =>
            add_message({ title: "This Feature Will Coming Soon" })
          }
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1, transition: { delay: 0.6 } }}
            viewport={{ amount: 0.5, once: true }}
          >
            <p>View All Collection</p>{" "}
            <i className="fa-solid fa-arrow-right"></i>
          </motion.div>
        </Link>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { delay: 0.8 } }}
          viewport={{ amount: 0.3, once: true }}
          className="collection_grid"
        >
          <div className="dress_shirt">
            {collection_list.map((coll, index) => {
              if (index < 2) return create_collection(coll);
            })}
          </div>
          {collection_list.map((coll, index) => {
            if (index >= 2) return create_collection(coll);
          })}
        </motion.div>
      </div>
    </div>
  );
};
