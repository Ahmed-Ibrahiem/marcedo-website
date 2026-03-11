import { Outlet } from "react-router-dom";
import SearchProvider from "../../Context/SearchContext";
import SearchOverlay from "../../Components/layout/search-overlay/SearchOverlay";
import Footer from "../../Components/layout/Footer/Footer";
import Header from "../../Components/layout/Header/Header";

const MainLayout = () => {
  return (
    <>
      <SearchProvider>
        <Header />
        <SearchOverlay />
      </SearchProvider>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
