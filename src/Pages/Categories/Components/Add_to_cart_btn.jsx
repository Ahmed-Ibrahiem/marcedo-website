// Button component that handles adding/removing items from cart with validation
const Add_to_cart_btn = ({
  cartItem,      // Boolean flag indicating if the product is already in cart
  select_color,  // Selected color value from user
  select_size,   // Selected size value from user
  style,         // CSS class name for styling the button
  action,        // Click handler function to add/remove from cart
}) => {
  return (
    <>
      {/* Show active cart button only when both color and size are selected */}
      {select_color && select_size && (
        <button onClick={action} className={style}>
          {/* Display different text based on whether item is already in cart */}
          <span>{cartItem ? "Remove From Cart" : "Add To Cart"}</span>
          {/* Shopping cart icon */}
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      )}
      
      {/* Show disabled button when color or size is not selected */}
      {(!select_color || !select_size) && (
        <button type="button" className={style}>
          Select Option
        </button>
      )}
    </>
  );
};

export default Add_to_cart_btn;