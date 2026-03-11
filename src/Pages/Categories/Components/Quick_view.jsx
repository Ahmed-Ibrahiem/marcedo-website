import { useEffect, useState } from "react";
import styles from "../CSS/Quick_view.module.css";
import { use_products_grid_context } from "../../../Context/ProductsGridProvider";
import main_style from "../Categories.module.css";
import { useCartContext } from "../../../Context/CartMenuContext";
import Add_to_cart_btn from "./Add_to_cart_btn";

// Component that displays a quick view modal for product details
const Quick_view = () => {
  // Get quick view popup control and product data from context
  const { close_quick_view_popup, quick_view_data } =
    use_products_grid_context();

  // Get cart management functions and cart data from context
  const { handleCatItemsPrograss, setCartItemsData, cartItemsData } =
    useCartContext();

  // Check if the current product is already in the cart
  const cartItem = cartItemsData.find((data) => data.id == quick_view_data.id);

  // Initialize quantity based on whether item is in cart or new
  const get_quantity = cartItem ? cartItem.quantity : 1;

  // State for quantity in the quick view (local state)
  const [quantity_review, setquantity_review] = useState(get_quantity);

  // State for tracking which image is currently displayed
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State for selected size option
  const [selectedSize, set_select_size] = useState("");

  // State for selected color option
  const [select_color, set_select_color] = useState("");

  // Handler to move to the next image in the gallery
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % quick_view_data.gallary.length);
  };

  // Handler to move to the previous image in the gallery
  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + quick_view_data.gallary.length) %
        quick_view_data.gallary.length,
    );
  };

  // Handler to update quantity with validation (must be greater than 0)
  const handleQuantityChange = (value) => {
    if (value > 0) setquantity_review(value);
  };

  // Utility function to format stock text by replacing hyphens with spaces
  const handle_stock_text = (text) => {
    return text.split("-").join(" ");
  };

  // Function to update the quantity of an item already in the cart
  const update_item_in_cart = () => {
    if (!cartItem) return;
    setCartItemsData((prev) =>
      prev.map((data) => {
        if (data.id == quick_view_data.id) {
          data.quantity = quantity_review;
        }
        return data;
      }),
    );
  };

  // Effect to populate color and size from existing cart item when component mounts
  useEffect(() => {
    if (!cartItem) return;
    set_select_color(cartItem.colors);
    set_select_size(cartItem.size);
  }, [cartItem]);

  // Effect to update cart item quantity whenever quantity_review changes
  useEffect(() => {
    update_item_in_cart();
  }, [quantity_review]);

  // Handler to add new item to cart or update existing item
  const add_to_cart = () => {
    const format_data = {
      ...quick_view_data,
      colors: select_color,
      size: selectedSize,
      quantity_review,
    };
    handleCatItemsPrograss(format_data);
  };

  return (
    <div className={styles.overlay}>
      {/* Modal Container - Quick view popup */}
      <div className={styles.modal}>
        {/* Close Button - Closes the quick view modal */}
        <button className={styles.close_btn} onClick={close_quick_view_popup}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className={styles.container}>
          {/* Image Section - Product image gallery with navigation */}
          <div className={styles.image_section}>
            <div className={styles.image_box}>
              <img
                src={quick_view_data.gallary[currentImageIndex]}
                alt={quick_view_data.title}
                className={styles.image}
              />

              {/* Navigation Arrows - Browse through product images */}
              <button
                onClick={handlePrevImage}
                className={`${styles.nav_btn} ${styles.nav_btn_left}`}
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>

              <button
                onClick={handleNextImage}
                className={`${styles.nav_btn} ${styles.nav_btn_right}`}
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>

          {/* Product Details Section - All product information and options */}
          <div className={styles.details_section}>
            {/* Product Title */}
            <h2 className={styles.title}>{quick_view_data.title}</h2>

            {/* Rating Section - Star rating and review count */}
            <div className={styles.rating_container}>
              <div className={styles.stars_contaienr}>
                {/* Render stars based on rating value */}
                {[...Array(Math.floor(quick_view_data.rating_value))].map(
                  (_, i) => (
                    <i className="fa-solid fa-star" key={i}></i>
                  ),
                )}
              </div>
              {/* Display review count or "no reviews" message */}
              <span className={styles.review_text}>
                {quick_view_data.rating_count
                  ? `${quick_view_data.rating_count} reviews`
                  : "no reviews"}
              </span>
            </div>

            {/* Product Information - Availability and product type */}
            <div className={styles.info_container}>
              <div className={styles.info_item}>
                <span className={styles.info_label}>Availability: </span>
                <span className={styles.info_value}>
                  {`${quick_view_data.available_quantity} ${handle_stock_text(quick_view_data.stock)}`}
                </span>
              </div>
              <div className={styles.info_item}>
                <span className={styles.info_label}>Product Type: </span>
                <span className={styles.info_value}>
                  {quick_view_data.brand}
                </span>
              </div>
            </div>

            {/* Product Price */}
            <div>
              <span className={styles.price}>
                ${quick_view_data.price.toFixed(2)}
              </span>
            </div>

            {/* Product Description */}
            <p className={styles.description}>{quick_view_data.description}</p>

            {/* Color Selection - Renders color options if available */}
            {quick_view_data.colors && quick_view_data.colors.length > 0 && (
              <div className={styles.color_section}>
                <label className={styles.color_label}>Color:</label>
                <div className={styles.color_btns_container}>
                  {/* Map through colors and create radio button for each */}
                  {quick_view_data.colors.map((color) => (
                    <input
                      disabled={cartItem} // Disable color selection if item is already in cart
                      type="radio"
                      key={color.id}
                      checked={select_color.id === color.id}
                      onChange={() => set_select_color(color)}
                      style={{ "--bg-color": color.code }}
                      className={`${styles.color_btn} ${main_style.color_options} ${cartItem ? styles.disabled_btn : ""}`}
                    ></input>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection - Renders size options if available */}
            {quick_view_data.size && quick_view_data.size.length > 0 && (
              <div className={styles.size_section}>
                <label className={styles.size_label}>Size:</label>
                <div className={styles.size_btns_container}>
                  {/* Map through sizes and create button for each */}
                  {quick_view_data.size.map((size) => (
                    <button
                      disabled={cartItem} // Disable size selection if item is already in cart
                      key={size}
                      onClick={() => set_select_size(size)}
                      className={`${styles.size_btn} ${
                        selectedSize === size ? styles.size_btn_active : ""
                      } ${cartItem ? styles.disabled_btn : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart Action Section */}
            <div className={styles.action_section}>
              {/* Quantity Selector */}
              <div className={styles.quantity_section}>
                <label className={styles.quantity_label}>Qty:</label>
                <div className={styles.quantity_container}>
                  {/* Decrease quantity button */}
                  <button
                    onClick={() => handleQuantityChange(quantity_review - 1)}
                    className={styles.quantity_btn}
                  >
                    −
                  </button>

                  {/* Quantity input field */}
                  <input
                    type="number"
                    value={quantity_review}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
                    className={styles.quantity_input}
                    min="1"
                  />

                  {/* Increase quantity button */}
                  <button
                    onClick={() => handleQuantityChange(quantity_review + 1)}
                    className={styles.quantity_btn}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart / Remove from Cart Button */}
              <Add_to_cart_btn
                style={styles.add_to_cart_btn}
                cartItem={cartItem}
                select_color={select_color}
                select_size={selectedSize}
                action={add_to_cart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quick_view;
