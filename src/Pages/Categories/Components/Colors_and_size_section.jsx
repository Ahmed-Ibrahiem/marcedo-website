import { useEffect, useState } from "react";
import style from "../CSS/Product_item.module.css";
import main_style from "../Categories.module.css";
import { useCartContext } from "../../../Context/CartMenuContext";

const Colors_and_size_section = ({
  data,
  size_label,
  color_label,
  select_color,
  select_size,
  set_select_color,
  set_select_size,
}) => {

  // Access cart state from Cart Context
  const { cartItemsId, cartItemsData } = useCartContext();

  // Check if the current product already exists in the cart
  const cartItem = cartItemsData.find((item) => item.id == data.id);

  // When the component mounts or cartItem changes,
  // sync the selected color and size with the cart data
  useEffect(() => {
    if (cartItem) {
      const cart_data = cartItemsData.find((item) => data.id == item.id);

      // Set the selected color and size from the cart
      set_select_color(cart_data.colors);
      set_select_size(cart_data.size);
    }
  }, [cartItem]);

  return (
    <div className={style.color_size_options}>

      {/* Render color label if it exists */}
      {color_label && color_label}

      {/* Color options */}
      <div className={style.colors_container}>
        {data.colors.map((color) => {
          return (
            <input
              // Disable color selection if the product already exists in the cart
              disabled={cartItemsId.includes(data.id)}

              // Mark the color as selected if it matches the selected color
              checked={select_color.id == color.id}

              type="radio"
              name={data.title}
              key={color.id}

              // Pass the color code as a CSS variable
              style={{ "--bg-color": color.code }}

              // Update selected color when user selects one
              onChange={() => set_select_color(color)}

              className={`${main_style.color_options} 
              ${style.color_btn} 
              ${cartItemsId.includes(data.id) ? style.disabled_btn : ""}`}
            />
          );
        })}
      </div>

      {/* Render size label if it exists */}
      {size_label && size_label}

      {/* Size options */}
      <div className={style.size_container}>
        {data.size.map((s, i) => {
          return (
            <button
              // Disable size selection if product already exists in cart
              disabled={cartItemsId.includes(data.id)}

              type="button"

              // Update selected size
              onClick={() => set_select_size(s)}

              className={`${style.size_btn} 
              ${select_size == s ? style.size_btn_active : ""} 
              ${cartItemsId.includes(data.id) ? style.disabled_btn : ""}`}

              key={i}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Colors_and_size_section;