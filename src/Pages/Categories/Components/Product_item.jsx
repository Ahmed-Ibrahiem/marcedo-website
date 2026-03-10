import { Link } from "react-router-dom";
import style from "../CSS/Product_item.module.css";
import { useCartContext } from "../../../Context/CartMenuContext";
import { useFavoriteContext } from "../../../Context/favoriteMenuContext";
import { use_products_grid_context } from "../../../Context/Products_grid_provider";
import {useState } from "react";
import Colors_and_size_section from "./Colors_and_size_section";
import Add_to_cart_btn from "./Add_to_cart_btn";

const Product_item = ({ data }) => {
  // Access cart state and actions from Cart Context
  const { handleCatItemsPrograss,  cartItemsData } =
    useCartContext();

  // Access wishlist state and actions from Favorite Context
  const { favoriteItemsId, handleFavoriteItems } = useFavoriteContext();

  // Access quick view updater from Products Grid Context
  const { update_quick_view_data } = use_products_grid_context();

  // Prepare product data with a default quantity
  const product_data = { ...data, quantity: 1 };

  // Local state to store the selected color and size
  const [select_color, set_select_color] = useState("");
  const [select_size, set_select_size] = useState("");

  // Find if the current product already exists in the cart
  const cartItem = cartItemsData.find((item) => item.id == data.id);

  // Function to add the product to the cart
  const add_to_cart = () => {
    const format_data = {
      ...data,
      colors: select_color,
      size: select_size,
      quantity: 1,
    };

    // Send formatted product data to the cart handler
    handleCatItemsPrograss(format_data);
  };

  return (
    <div className={style.product_item}>
      {/* Product Image Section */}
      <div className={style.img_box}>
        {/* Secondary image used for hover effect */}
        <div className={style.second_img}>
          <img src={data.image} alt="" />
        </div>

        {/* Main product image */}
        <img src={data.image} alt="" />

        {/* Action buttons overlay (wishlist / quick view) */}
        <div className={style.action_area}>
          {/* Wishlist Button */}
          <div>
            <p>
              {favoriteItemsId.includes(product_data.id)
                ? "Remove Wishlist"
                : "Add To Wishlist"}
            </p>

            <button
              onClick={() => {
                handleFavoriteItems(product_data);
              }}
            >
              <i
                className={`${
                  favoriteItemsId.includes(product_data.id)
                    ? "fa-solid fa-xmark"
                    : "fa-regular fa-heart"
                }`}
              ></i>
            </button>
          </div>

          {/* Quick View Button */}
          <div>
            <p>Quick View</p>
            <button onClick={() => update_quick_view_data(product_data)}>
              <i className="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info Section */}
      <div className={style.product_info_container}>
        <div className={style.product_info}>
          {/* Product Title */}
          <Link className={style.title}>{data.title}</Link>

          {/* Product Description */}
          <p className={style.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            accusantium nemo asperiores blanditiis explicabo excepturi, earum
            quasi deserunt debitis dolor.
          </p>

          {/* Product Price Section */}
          <div
            className={`${style.price} ${
              data.discount > 0 && style.has_discount
            }`}
          >
            {/* Old price (shown only if there is a discount) */}
            <span className={style.discount}>${data.old_price}</span>

            {/* Current price */}
            <span className={style.current_price}>${data.price}</span>
          </div>

          {/* Component responsible for color and size selection */}
          <Colors_and_size_section
            data={data}
            select_color={select_color}
            select_size={select_size}
            set_select_color={set_select_color}
            set_select_size={set_select_size}
          />
        </div>

        {/* Add to cart button component */}
        <Add_to_cart_btn
          style={style.add_to_cart}
          action={add_to_cart}
          cartItem={cartItem}
          select_color={select_color}
          select_size={select_size}
        />
      </div>
    </div>
  );
};

export default Product_item;
