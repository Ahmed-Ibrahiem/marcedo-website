import { useEffect, useState } from "react";
import { assets, deals_data } from "../../assets/assets";
import "./Deals.css";
import { Link } from "react-router-dom";

const Deals = () => {
  const [currentImgColor, setCurrentImgColor] = useState("black");
  const deals_event_day = "Dec , 30 , 2026 23:59:59";
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [numberOfHours, setNumberOfHours] = useState(0);
  const [numberOfMinutes, setNumberOfMinutes] = useState(0);
  const [numberOfSeconds, setNumberOfSeconds] = useState(0);

  // Get The Date
  useEffect(() => {
    // The Day Of Event
    const event_day = new Date(deals_event_day).getTime();

    let counter = setInterval(() => {
      // Get Current Day
      const current_day = new Date().getTime();

      // Get the diffrent between the current day and the event day by mill
      const diff = event_day - current_day;

      // Stop the counter if the event day is current day
      if (diff <= 0) {
        clearInterval(counter);
      }

      // Get the day
      setNumberOfDays(Math.floor(diff / (1000 * 60 * 60 * 24)));

      // Get the number of hours
      setNumberOfHours(
        Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );

      // Get The number of minutes
      setNumberOfMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));

      // Get the number of second
      setNumberOfSeconds(Math.floor((diff % (1000 * 60)) / 1000));
    }, 1000);
  }, [numberOfSeconds]);

  return (
    <div className="deals_section">
      <div className="container deals_container">
        <div className="deals_card_part">
          <h2>Deals Of The Day</h2>
          <div className="deals_card_box">
            <div className="deals_card">
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

                <div className="deal_timer">
                  <span>hurry up! promotion will expires in</span>
                  <div>
                    <span className="timer_days">{numberOfDays}d</span>
                    <span className="timer_hours">{numberOfHours}h</span>
                    <span className="timer_minutes">{numberOfMinutes}m</span>
                    <span className="timer_seconds">{numberOfSeconds}s</span>
                  </div>
                </div>

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
          <Link to={`/product_detials/6`} className="button_product_nav">
            <i className="fa-solid fa-long-arrow-up"></i>
          </Link>
        </div>
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
