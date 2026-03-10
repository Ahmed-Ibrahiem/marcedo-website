import { useEffect, useState } from "react";
import { use_product_detials_context } from "../../../../Context/Product_details_context";
import { useCartContext } from "../../../../Context/CartMenuContext";
import { toast } from "react-toastify";
import Success_Toast from "../../../Confirm Message/Success_Toast";

const SetOrder = () => {
  const { data } = use_product_detials_context();
  const { selected_options, is_in_a_cart } = use_product_detials_context();
  const {
    handleCatItemsPrograss,
    cartItemsData,
    cartItemsId,
    icreaseOrReduceProQuantity,
    find_data_from_cart,
  } = useCartContext();

  const formate_date = () => {
    const date = new Date(data.pricing.offer_expiry); // Convert string to Date object
    return date.toLocaleDateString("en", {
      month: "short", // Short month name (e.g., Jan, Feb)
      day: "numeric", // Day of the month
      year: "numeric", // Full year
    });
  };

  // Function to increase product quantity
  const increment_count = () => {
    if (actial_data.quantity < actial_data.available_quantity) {
      // Check max stock
      set_actial_data({ ...actial_data, quantity: actial_data.quantity + 1 }); // Update local state
      if (cartItemsId.includes(+data.id)) {
        // If product already in cart
        icreaseOrReduceProQuantity("plus", data.id); // Update cart quantity
      }
    }
  };

  // Function to decrease product quantity
  const decrement_count = () => {
    if (actial_data.quantity > 1) {
      // Ensure quantity doesn't go below 1
      set_actial_data({ ...actial_data, quantity: actial_data.quantity - 1 }); // Update local state
      if (cartItemsId.includes(+data.id)) {
        // If product already in cart
        icreaseOrReduceProQuantity("minus", data.id); // Update cart quantity
      }
    }
  };

  const [actial_data, set_actial_data] = useState({}); // Local state to manage product quantity & options

  // Function to add the product to the cart
  const handle_send_to_bag = () => {
    const handle_data = {
      ...{
        id: data.id,
        title: data.name,
        image: data.images.main,
        rating_value: data.ratings.average,
        rating_count: data.ratings.total_ratings,
        price: data.pricing.price,
        old_price: data.pricing.original_price,
        discount: data.pricing.discount_percentage,
        installment: data.pricing.installment,
        offers: data.pricing.offer_note,
        category: data.category,
        available_quantity: 10,
        specification: selected_options.specification,
        color: selected_options.color,
      },
      quantity: actial_data.quantity,
    };

    handleCatItemsPrograss(handle_data); // Call function to handle adding/updating cart
  };

  // Update local state when cart data changes
  useEffect(() => {
    const data_id = cartItemsData.map((data) => +data.id); // Get all IDs in the cart
    if (data_id.includes(+data.id)) {
      // If current product is in the cart
      set_actial_data(find_data_from_cart(data.id)); // Use cart data for this product
    } else {
      set_actial_data(data); // Otherwise, use default product data
    }
  }, [cartItemsData]); // Trigger effect when cart items change

  return (
    <div className="set-order-container">
      <div className="set-order">
        <div className="header">
          <div className="offer">
            <p>{data.pricing.discount_percentage}% Off</p>
            <span>if order over {data.pricing.price} EGP</span>
          </div>
          <span>Until {formate_date()}</span>
        </div>
        <div className="body">
          <div className="top">
            <p>Set Order</p>
          </div>
          <div className="center">
            <div className="product-info">
              <button>
                <img src={data.images.main} alt="" />
              </button>
              <div className="color">
                <h3>Selected Color:</h3>
                <p>{selected_options.color}</p>
              </div>
            </div>
            <div className="available">
              <div className="average">
                <button
                  className={`${actial_data.quantity > 1 ? "allow-click" : ""}`}
                  style={
                    actial_data.quantity <= 1
                      ? { pointerEvents: "none" }
                      : {}
                  }
                  onClick={() => {
                    decrement_count();

                    // Show success toast
                    is_in_a_cart() &&
                      toast(<Success_Toast message={"Update Successfully"} />);
                  }}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <p>{actial_data.quantity}</p>
                <button
                  className={`${actial_data.quantity < actial_data.available_quantity ? "allow-click" : ""}`}
                  style={
                    actial_data.quantity >= actial_data.available_quantity 
                      ? { pointerEvents: "none" }
                      : {}
                  }
                  onClick={() => {
                    increment_count();
                    // Show success toast
                    is_in_a_cart() &&
                      toast(<Success_Toast message={"Update Successfully"} />);
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <p>Available Now!</p>
            </div>
            <div className="total-price">
              <p>Total Price:</p>
              <span className="price">
                {Math.round(actial_data.price * actial_data.quantity)} {""}
                {data.pricing.currency}
              </span>
            </div>
            <div className="buttons">
              <button>Buy Now</button>
              <button className="Bag" onClick={handle_send_to_bag}>
                <i className="fa-solid fa-bag-shopping"></i>
                <span>
                  {cartItemsId.includes(+actial_data.id)
                    ? "Remove From Bag"
                    : "Add To Bag"}
                </span>
              </button>
            </div>
          </div>
          <div className="bottom">
            <a href="##">
              <img src="../icons/comment.png" alt="" />
              <span>Chat Seller</span>
            </a>
            <a href="##">
              <img src="../icons/share.png" alt="" />
              <span>Share Product</span>
            </a>
          </div>
        </div>
        <div className="footer">
          <p>Any problem with this product?</p>
          <a href="##">
            <i className="fa-solid fa-flag"></i>
            <span>Report</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SetOrder;
