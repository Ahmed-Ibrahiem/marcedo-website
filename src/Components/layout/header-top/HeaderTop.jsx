import "./HeaderTop.css";

const HeaderTop = () => {
  return (
    <div className="header_top">
      <span className="special">Special</span>
      <p className="discount_text">
        Get <span className="discount">10</span>% <b>DISCOUNT</b> for first order
      </p>
      <button className="register_now">Register Now</button>
    </div>
  );
};

export default HeaderTop;
