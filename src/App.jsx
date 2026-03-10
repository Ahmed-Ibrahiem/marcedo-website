import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Scroll_button from "./Components/Scroll button/Scroll_button.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./App.css";
import Products from "./Pages/Products/Products.jsx";
import CartItems from "./Components/Cart/CartItems.jsx";
import Custom_message_toast from "./Components/Coming Soon/Custom_message_toast.jsx";
import Wishlist_page from "./Pages/Wishlist/Wishlist_page.jsx";
import About_us from "./Pages/About us Page/About_us.jsx";
import Contact_page from "./Pages/Contact Page/Contact_page.jsx";
import Shop_page from "./Pages/Colliction/Shop_page.jsx";
import Categories from "./Pages/Categories/Categories.jsx";
import Checkout_page from "./Pages/Checkout/Checkout_page.jsx";
import MainLayout from "./Pages/Layout/MainLayout.jsx";
import Order_successfull from "./Pages/Order Successfull/Order_successfull.jsx";
import Auth_popup from "./Pages/Auth_popup/Auth_popup.jsx";

const App = () => {
  return (
    <div className="app">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* cover the Header And SearchOverlay By SearchProvider context  */}

      <Custom_message_toast />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product_detials/:product_id" element={<Products />} />
          <Route path="/wishlist" element={<Wishlist_page />} />
          <Route path="/about-us" element={<About_us />} />
          <Route path="/contact-us" element={<Contact_page />} />
          <Route path="/shop" element={<Shop_page />} />
          <Route path="/categories/:category_type" element={<Categories />} />
          <Route path="/shop/:category_type" element={<Categories />} />
          <Route path="/order-success" element={<Order_successfull />} />
        </Route>
        <Route path="/checkout" element={<Checkout_page />} />
      </Routes>

      <Scroll_button />
      <CartItems />
      <Auth_popup />
    </div>
  );
};

export default App;
