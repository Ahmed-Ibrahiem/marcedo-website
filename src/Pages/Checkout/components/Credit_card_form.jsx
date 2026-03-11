import { useEffect, useState } from "react";
import style from "../Css/Credit_card_form.module.css";
import { use_checkout_context } from "../../../Context/CheckoutProvider";
import Form_errors_message from "../../../Components/ui/Errors/Form_errors_message";

const Credit_card_form = () => {
  const { payment_form } = use_checkout_context();
  const {
    register,
    formState: { errors },
  } = payment_form;

  useEffect(() => {
    localStorage.credit_card_info = JSON.stringify();
  }, []);

  return (
    <div className={style.credit_card_from}>
      <div className={style.card_number}>
        <input
          type="number"
          placeholder="Card number"
          {...register("credit_info.card_number")}
        />
        {errors.credit_info?.card_number && (
          <Form_errors_message
            message={errors.credit_info?.card_number?.message}
          />
        )}
      </div>
      <div className={style.expiration_date}>
        <input
          type="month"
          placeholder="Expiration date (MM / YY)"
          {...register("credit_info.expiration_data", { valueAsDate: true })}
        />
        {errors.credit_info?.expiration_data && (
          <Form_errors_message
            message={errors.credit_info?.expiration_data?.message}
          />
        )}
      </div>
      <div className={style.security_code}>
        <input
          type="number"
          placeholder="Security Code"
          {...register("credit_info.cvv")}
        />
        {errors.credit_info?.cvv && (
          <Form_errors_message message={errors.credit_info?.cvv?.message} />
        )}
      </div>
      <div className={style.name_of_card}>
        <input
          type="text"
          placeholder="Name of card"
          {...register("credit_info.card_name")}
        />
        {errors.credit_info?.card_name && (
          <Form_errors_message
            message={errors.credit_info?.card_name?.message}
          />
        )}
      </div>
    </div>
  );
};

export default Credit_card_form;
