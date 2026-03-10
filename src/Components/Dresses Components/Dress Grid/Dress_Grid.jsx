import { use_dress_context } from "../../../Context/DressContext";
import Bubbles from "../../Product Details Page Components/Product info components/Bubbles/Bubbles";
import ProductItem from "../../Product item/ProductItem";

const Dress_Grid = () => {
  const { data_will_dispaly, current_package_num, number_of_packages , set_current_package_num } =
    use_dress_context();

  return (
    <div className="product-viewing-place">
      <div className="page-path">
        <h3>All Categories</h3>
      </div>
      <div className="products-contianer">
        {data_will_dispaly.length >= 1 &&
          data_will_dispaly.map((pro_data, index) => {
            if (index <= 10) {
              return <ProductItem key={pro_data.id} product_data={pro_data} />;
            }
          })}

        {data_will_dispaly.length <= 0 && (
          <>
            <div className="no_prodcut">
              <i className="fa-solid fa-box"></i>
              <h3 className="no_product">No Prodcuts</h3>
            </div>
          </>
        )}
      </div>
      <Bubbles
        current_page={current_package_num}
        number_of_pages={number_of_packages}
        set_current_page={set_current_package_num}
      />
    </div>
  );
};

export default Dress_Grid;
