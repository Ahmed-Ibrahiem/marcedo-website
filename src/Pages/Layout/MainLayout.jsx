import { Outlet } from "react-router-dom";
import SearchOverlay from "../../Components/layout/search-overlay/SearchOverlay";
import Footer from "../../Components/layout/Footer/Footer";
import Header from "../../Components/layout/Header/Header";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScrolling = () => {
      if (window.scrollY > 90) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScrolling);

    return () => window.removeEventListener("scroll", handleScrolling);
  }, []);

  return (
    <>
      <Header
        setIsSearchOverlayOpen={setIsSearchOverlayOpen}
        isSticky={isSticky}
      />
      <SearchOverlay
        isSearchOverlayOpen={isSearchOverlayOpen}
        setIsSearchOverlayOpen={setIsSearchOverlayOpen}
      />
      <div
        style={
          isSticky
            ? { marginTop: "120px", transition: "none" }
            : { transition: "none" }
        }
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
