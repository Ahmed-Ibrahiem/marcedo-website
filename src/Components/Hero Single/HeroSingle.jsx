import { use_notification_context } from "../../Context/Notification_provider";
import "./HeroSingle.css";

const HeroSingle = ({ activeIndex, index, slider }) => {
  const { add_message } = use_notification_context();
  return (
    <div
      style={{ backgroundImage: `url(${slider.background})` }}
      className={`hero_single ${activeIndex === index ? "animate" : ""}`}
    >
      <h2 className="title">{slider.title}</h2>
      <p>{slider.description}</p>
      <button
        onClick={() => add_message({ title: "This Feature Will Coming Soon" })}
        date-id_product={slider.product_id}
      >
        Shop Now
      </button>
      <div className="img_box">
        <img src={slider.img} alt="" />
      </div>
    </div>
  );
};

export default HeroSingle;
