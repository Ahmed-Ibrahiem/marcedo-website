import { useRef } from "react";
import useOutside_click from "../../../Hooks/Outside_click";
import { useHeaderBottomContext } from "../../../Context/HeaderBottomContext";
import { Link } from "react-router-dom";
import { use_notification_context } from "../../../Context/NotificationProvider";

const Categoties_menu = ({ assets }) => {
  const { add_message } = use_notification_context();

  const {
    current_category,
    categories_menu,
    setCategories_menu,
    setCurrent_category,
  } = useHeaderBottomContext();
  const categories_options = [
    {
      title: "All Categorais",
    },
    {
      title: "Dress",
      img: assets.dress_img,
      page: "/categories/dresses",
    },
    {
      title: "Apple",
      img: assets.apple_img,
      page: "/apple",
    },
    {
      title: "T-shirt",
      img: assets.t_shirt_img,
      page: "/t-shirts",
    },
    {
      title: "Electronic",
      img: assets.electronic_img,
      page: "/electronic-page",
    },
    {
      title: "Perfume",
      img: assets.perfume_img,
    },
    {
      title: "Wristwatch",
      img: assets.wrist_Watch,
    },
  ];
  const menu_ref = useRef(null);
  useOutside_click(menu_ref, () => setCategories_menu(false));

  return (
    <div
      ref={menu_ref}
      className={`categories ${categories_menu ? "show_category_menu" : ""}`}
      onClick={(e) => {
        setCategories_menu((prev) => (prev ? false : true));
      }}
    >
      <div className="current_option">
        <span>{current_category}</span>
      </div>
      <i className="fa-solid fa-angle-down"></i>
      <div className={`category_options`}>
        {categories_options.map((option, index) => {
          return (
            <Link
              to={option.title == "Dress" && option.page}
              key={index}
              className="option"
              onClick={() => {
                setCurrent_category(option.title);
                if (option.title != "Dress") {
                  add_message({
                    title: "This Category Will Coming Soon",
                    link: { url: "/dresses", name: "Category Dresses" },
                  });
                }
              }}
            >
              <p>{option.title}</p>
              {option.img && <img src={option.img} alt={option.title} />}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categoties_menu;
