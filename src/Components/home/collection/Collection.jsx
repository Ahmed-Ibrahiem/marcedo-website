import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import "./Collection.css";
import { use_notification_context } from "../../../Context/NotificationProvider";

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
          href="##"
        >
          <img src={assets.arrow_up_right_orange} alt="" />
        </button>
      </Link>
    );
  };

  return (
    <div className="collection">
      <div className="container">
        <h1>Our Collection</h1>
        <p>
          By having categories of colthes, we ensure that every customer can
          find the right choice for their style and needs, so that they can look
          confident and appropriate for different occasions or moods.
        </p>
        <Link
          onClick={() =>
            add_message({ title: "This Feature Will Coming Soon" })
          }
        >
          <p>View All Collection</p> <i className="fa-solid fa-arrow-right"></i>
        </Link>
        <div className="collection_grid">
          <div className="dress_shirt">
            {collection_list.map((coll, index) => {
              if (index < 2) return create_collection(coll);
            })}
          </div>
          {collection_list.map((coll, index) => {
            if (index >= 2) return create_collection(coll);
          })}
        </div>
      </div>
    </div>
  );
};
