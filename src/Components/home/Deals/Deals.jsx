import { useEffect, useState } from "react";
import { assets, deals_data } from "../../../assets/assets";
import "./Deals.css";
import { Link } from "react-router-dom";

// Section that displays a featured deal with a countdown timer and side banners
const Deals = () => {
  // Tracks which color variant is currently selected
  const [currentImgColor, setCurrentImgColor] = useState("black");

  // The target date when the deal expires
  const deals_event_day = "Dec , 30 , 2026 23:59:59";

  // Countdown timer states
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [numberOfHours, setNumberOfHours] = useState(0);
  const [numberOfMinutes, setNumberOfMinutes] = useState(0);
  const [numberOfSeconds, setNumberOfSeconds] = useState(0);

  // Calculate and update the countdown every second
  useEffect(() => {
    // Convert the event date to milliseconds
    const event_day = new Date(deals_event_day).getTime();

    let counter = setInterval(() => {
      // Get the current time in milliseconds
      const current_day = new Date().getTime();

      // Calculate the difference between the event date and now
      const diff = event_day - current_day;

      // Stop the counter when the deal has expired
      if (diff <= 0) {
        clearInterval(counter);
      }

      // Extract days, hours, minutes, and seconds from the difference
      setNumberOfDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setNumberOfHours(
        Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      setNumberOfMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setNumberOfSeconds(Math.floor((diff % (1000 * 60)) / 1000));
    }, 1000);
  }, [numberOfSeconds]);

  return (
    <div className="deals_section">
      <div className="container deals_container">
        {/* Main deal card section */}
        <div className="deals_card_part">
          <h2>Deals Of The Day</h2>
          <div className="deals_card_box">
            <div className="deals_card">
              {/* Thumbnail gallery — clicking a thumbnail switches the main image */}
              <div className="product_gallery">
                {deals_data.variants.map((variable, index) => {
                  return (
                    <button
                      className={`product_thump ${
                        currentImgColor == variable.color ? "active" : ""
                      }`}
                      key={index}
                      onClick={() => setCurrentImgColor(variable.color)}
                    >
                      <img src={variable.image} alt="" />
                    </button>
                  );
                })}
              </div>

              {/* Main product image — only the selected color variant is visible */}
              <div className="product_main_image">
                {deals_data.variants.map((variable, index) => {
                  return (
                    <img
                      src={variable.image}
                      key={index}
                      className={`${
                        currentImgColor == variable.color ? "active" : ""
                      }`}
                    />
                  );
                })}
              </div>

              {/* Product info and specs */}
              <div className="product_details">
                <h3 className="product_title">
                  Apple iPhone 15 (128G) - Black
                </h3>
                <div className="product_price">
                  <span className="current_price">
                    <span>EGP</span> 36,599
                  </span>
                  <span className="old_price">40,000</span>
                </div>
                <p className="product_brand">
                  <span>Brand Name:</span> Apple
                </p>
                <p className="product_os">
                  <span>Operating System:</span> iOS 17
                </p>
                <p className="product_memory">
                  <span>Memory:</span> 128 GB
                </p>
                <p className="product_screen">
                  <span>Screen:</span> 6.1
                </p>
                <p className="product_model">
                  <span>Model:</span> iPhone 15
                </p>

                {/* Countdown timer showing remaining time for the deal */}
                <div className="deal_timer">
                  <span>hurry up! promotion will expires in</span>
                  <div>
                    <span className="timer_days">{numberOfDays}d</span>
                    <span className="timer_hours">{numberOfHours}h</span>
                    <span className="timer_minutes">{numberOfMinutes}m</span>
                    <span className="timer_seconds">{numberOfSeconds}s</span>
                  </div>
                </div>

                {/* Progress bar showing how many units have been sold */}
                <div className="deal_progress">
                  <div className="progress_bar">
                    <span style={{ width: `${(24 / 50) * 100}%` }}></span>
                  </div>
                </div>
                <p className="deal_sold">
                  <span className="">Sold:</span> 24 / 50
                </p>
              </div>
            </div>
            <div className="supporter"></div>
          </div>

          {/* Button to navigate to the full product details page */}
          <Link to={`/product_detials/6`} className="button_product_nav">
            <i className="fa-solid fa-long-arrow-up"></i>
          </Link>
        </div>

        {/* Side banners linking to other products */}
        <div className="deals_side_banner">
          <div className="side_banner1">
            <div className="img_box">
              <img
                src={assets.deals_side_banner1}
                alt=""
                className="banner_img"
              />
            </div>
            <Link className="banner_icon">
              <div className="box_style1"></div>
              <div className="box_style2"></div>
              <i className="fa-solid fa-long-arrow-up icon"></i>
            </Link>
          </div>
          <div className="side_banner2">
            <div className="img_box">
              <img
                src={assets.deals_side_banner2}
                alt=""
                className="banner_img"
              />
            </div>
            <Link to={`/product_detials/1`} className="banner_icon">
              <div className="box_style1"></div>
              <div className="box_style2"></div>
              <i className="fa-solid fa-long-arrow-up icon"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
