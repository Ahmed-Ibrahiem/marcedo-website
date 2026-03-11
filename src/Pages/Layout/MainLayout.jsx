import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import SearchProvider from "../../Context/SearchContext";
import SearchOverlay from "../../Components/search-overlay/SearchOverlay";

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
