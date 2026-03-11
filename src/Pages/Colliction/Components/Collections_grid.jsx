import { useEffect, useState } from "react";
import style from "../Shop_page.module.css";
import { use_shop_context } from "../../../Context/ShopProvider";
import { use_pagination_context } from "../../../Context/PaginationProvider";
import { Link } from "react-router-dom";

export const Collections_grid = () => {
  const [has_hover, set_has_hover] = useState(false);
  const { set_pagination_data, display_data, set_number_of_items_in_package } =
    use_pagination_context();
  const { all_collections } = use_shop_context();

  useEffect(() => {
    if (all_collections.length <= 0) return;
    set_pagination_data(all_collections);
    set_number_of_items_in_package(9);
  }, [all_collections]);

  return (
    <div className={style.collections_grid}>
      {display_data &&
        display_data.map((data) => {
          return (
            <Link key={data.id} to={data.slug} className={style.collection}>
              <img src={data.image} alt={`This Image Of ${data.title}`} />
              <span>{data.title}</span>
              <button
                onMouseEnter={() => set_has_hover(true)}
                onMouseLeave={() => set_has_hover(false)}
                className="action"
              >
                {has_hover && <img src="/src/assets/right-up.png" alt="" />}
                {!has_hover && (
                  <img src="/src/assets/right-up-black.png" alt="" />
                )}
              </button>
            </Link>
          );
        })}
    </div>
  );
};
