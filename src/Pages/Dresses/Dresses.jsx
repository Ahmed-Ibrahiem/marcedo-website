import { useLayoutEffect } from "react";
import Dress_Grid from "../../Components/Dresses Components/Dress Grid/Dress_Grid";
import Filter_menu from "../../Components/Dresses Components/Filter Menu/Filter_menu";
import DressProvider from "../../Context/DressContext";
import "./Dresses.css";
const Dresses = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <DressProvider>
        <div className="dress_body">
          <Filter_menu />
          <Dress_Grid />
        </div>
      </DressProvider>
    </div>
  );
};

export default Dresses;
