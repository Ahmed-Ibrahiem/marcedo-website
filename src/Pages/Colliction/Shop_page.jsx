import Our_banner from "../../Components/ui/our-banner/Our_banner";
import style from "./Shop_page.module.css";
import Bubbles from "../../Components/ui/Bubbles/Bubbles";
import Pagination_provider from "../../Context/PaginationProvider";
import { Collections_grid } from "./Components/Collections_grid";
import { useLayoutEffect } from "react";

const Shop_page = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={style.shop_area}>
      <div className="container">
        <Our_banner
          page_data={{
            title: "Collections",
          }}
        />
        <Pagination_provider>
          <Collections_grid />
          <Bubbles />
        </Pagination_provider>
      </div>
    </div>
  );
};

export default Shop_page;
