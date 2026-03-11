import { assets } from "../../../assets/assets";
import "./PerOrder.css";
const PerOrder = () => {
  return (
    <div className="pre_order">
      <div className="container">
        <div className="text1">
          <h2>PRE ORDER</h2>
          <span>BE AMONG THE FIRST TO OWN IT!</span>
          <p>FROM 35,000 EGP</p>
        </div>
        <div className="image_container">
          <div></div>
          <img src={assets.gaming_monitor} alt="" />
        </div>
        <div className="text2">
          <div>
            <p>180Hz Curved Ultra</p>
            <p>Gaming Monitor</p>
          </div>
          <p>Dive Into An Unmatched Gaming Experience </p>
        </div>
        <a href="##">Discover Now</a>
      </div>
    </div>
  );
};

export default PerOrder;
