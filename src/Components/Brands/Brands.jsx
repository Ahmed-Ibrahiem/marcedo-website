import { assets } from "../../assets/assets";
import { use_notification_context } from "../../Context/Notification_provider";
import "./Brands.css";

const Brands = () => {
  const { add_message } = use_notification_context();

  return (
    <div className="brands">
      <div className="container">
        <h1>Popular Brands</h1>
        <div className="brands_grid">
          <div className="brand brand_one">
            <img src={assets.brand_one} alt="" />
            <p>ACELOS 3D</p>
            <h1>VR Headset and Controllers</h1>
            <button
              onClick={() =>
                add_message({ title: "This Page Will Coming Soon" })
              }
            >
              Shop Now
            </button>
          </div>
          <div className="brand brand_two">
            <img src={assets.brand_two} alt="" />
            <h1>MASSAGE CHAIR LUXURY</h1>
            <p>Fuka Relax Full Body Massage Chair</p>
            <button
              onClick={() =>
                add_message({ title: "This Page Will Coming Soon" })
              }
            >
              Shop Now
            </button>
          </div>
          <div className="brand brand_three">
            <img src={assets.brand_three1} className="image1" alt="" />
            <img src={assets.brand_three2} className="image2" alt="" />
            <p>OKODo</p>
            <h1>hero 11+ black</h1>
            <button
              onClick={() =>
                add_message({ title: "This Page Will Coming Soon" })
              }
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
