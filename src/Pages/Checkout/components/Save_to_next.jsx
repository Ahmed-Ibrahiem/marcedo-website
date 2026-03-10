import { use_checkout_context } from "../../../Context/Checkout_provider";
import style from "../Css/Address_box.module.css";

const Save_to_next = () => {
  const { payment_form: {register} } = use_checkout_context();
  
  return (
    <div className={style.save_to_next}>
      <input type="checkbox" id="save_to_next" {...register('save_address_info_next')} />
      <label htmlFor="save_to_next">Save this information for next time</label>
    </div>
  );
};

export default Save_to_next;
