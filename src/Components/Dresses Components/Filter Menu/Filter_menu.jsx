import Brand_filter from "./Brand_filter";
import Type_filter from "./Type_filter";
import Material_filter from "./Material_filter";
import Occasion_filter from "./Occasion_filter";
import Price_range_filter from "./Price_range_filter";

const Filter_menu = () => {
  return (
    <div className="filter-menu ">
      <h2 className="filter">Filter Products</h2>
      <div className="inner">
        <Brand_filter />
        <Type_filter />
        <Material_filter />
        <Occasion_filter />
        <Price_range_filter />
      </div>
    </div>
  );
};

export default Filter_menu;
