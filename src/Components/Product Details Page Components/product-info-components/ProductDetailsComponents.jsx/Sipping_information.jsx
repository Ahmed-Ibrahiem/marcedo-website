import { use_product_detials_context } from "../../../../Context/Product_details_context";

const Sipping_information = () => {
  const { data } = use_product_detials_context();
  return (
    <div className="sipping-information">
      <h2>Shipping Information</h2>
      <ul>
        <li>
          Delivery: <span>{data.shipping.from}</span>
        </li>
        <li>
          Shipping: <span>{data.shipping.type}</span>
        </li>
        <li>
          Arrival:
          <span>{data.shipping.estimated_delivery_days}</span>
        </li>
      </ul>
    </div>
  );
};

export default Sipping_information;
