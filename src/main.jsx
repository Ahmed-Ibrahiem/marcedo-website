import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import FavoriteProvider from "./Context/favoriteMenuContext.jsx";
import CartMenuProvider from "./Context/CartMenuContext.jsx";
import FetchAllProductsProvider from "./Context/FetchAllProducts.jsx";
import Notification_provider from "./Context/NotificationProvider.jsx";
import Shop_provider from "./Context/ShopProvider.jsx";
import Categories_provider from "./Context/CategoriesProvider.jsx";
import Auth_provider from "./Context/AuthProvider.jsx";
import Checkout_provider from "./Context/CheckoutProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Auth_provider>
        <CartMenuProvider>
          <Checkout_provider>
            <Notification_provider>
              <FetchAllProductsProvider>
                <FavoriteProvider>
                  <Shop_provider>
                    <Categories_provider>
                      <App />
                    </Categories_provider>
                  </Shop_provider>
                </FavoriteProvider>
              </FetchAllProductsProvider>
            </Notification_provider>
          </Checkout_provider>
        </CartMenuProvider>
      </Auth_provider>
    </BrowserRouter>
  </StrictMode>,
);
