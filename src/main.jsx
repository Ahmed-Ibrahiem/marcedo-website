import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import FavoriteProvider from "./Context/favoriteMenuContext.jsx";
import CartMenuProvider from "./Context/CartMenuContext.jsx";
import Notification_provider from "./Context/NotificationProvider.jsx";
import Categories_provider from "./Context/CategoriesProvider.jsx";
import Auth_provider from "./Context/AuthProvider.jsx";
import Checkout_provider from "./Context/CheckoutProvider.jsx";
import QuickViewPopupsProvider from "./Context/QuickViewPopupsProvider.jsx";
// import { seedAllData } from "./services/seedData.js";

// seedAllData()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Auth_provider>
        <QuickViewPopupsProvider>
          <CartMenuProvider>
            <Checkout_provider>
              <Notification_provider>
                <FavoriteProvider>
                  <Categories_provider>
                    <App />
                  </Categories_provider>
                </FavoriteProvider>
              </Notification_provider>
            </Checkout_provider>
          </CartMenuProvider>
        </QuickViewPopupsProvider>
      </Auth_provider>
    </BrowserRouter>
  </StrictMode>,
);
