import Contact_box from "./Contact_box";
import Delivery_box from "./Delivery_box";
import Address_box from "./Address_box";
import { use_checkout_context } from "../../../Context/Checkout_provider";
import { useWatch } from "react-hook-form";

const Checkout_form = () => {
  const { payment_form } = use_checkout_context();

  const delivery_type = useWatch({
    name: "delivery_type",
    control: payment_form.control,
  });

  return (
    <div className="payment_area">
      <Contact_box />
      <Delivery_box />
      {delivery_type == "ship" && <Address_box />}
    </div>
  );
};

export default Checkout_form;
