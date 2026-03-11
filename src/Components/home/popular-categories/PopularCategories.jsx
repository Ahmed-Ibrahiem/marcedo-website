import { Link } from "react-router-dom";
import { popular_categories } from "../../../assets/assets";
import "./PopularCategories.css";
import { use_notification_context } from "../../../Context/NotificationProvider";

const PopularCategories = () => {
  const { add_message } = use_notification_context();
  return (
    <section className="popular_categorais">
      <div className="container">
        <h3>
          Popular <span>Categories</span>
        </h3>
        <div className="box_container">
          {popular_categories.map((category, index) => {
            return (
              <div
                onClick={() => {
                  if (index != 2)
                    add_message({
                      title:
                        "This Page Will Coming Soon , You Can Visit This Page",
                      link: { url: "/dresses", name: "Dresses Page" },
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
