import { useEffect, useMemo, useState } from "react";
import style from "../Css/Address_box.module.css";
import axios from "axios";
import { use_checkout_context } from "../../../Context/CheckoutProvider";
import Form_errors_message from "../../../Components/ui/Errors/Form_errors_message";

const Suggestions_part = () => {
  // --- State Management ---
  const [is_user_closed_menu, set_is_user_closed_menu] = useState(false); // Flag to manually hide the suggestion dropdown
  const { payment_form, suggestions } = use_checkout_context();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = payment_form;

  const address_input = watch("address_info.address") || "";

  // Get The suggestion that will display depend on address input
  const suggestions_display = useMemo(() => {
    if (address_input.trim() == "") return [];
    const all_suggestions = [...suggestions.map((word) => word.toLowerCase())];
    const suggestion_filter = all_suggestions.filter((word) =>
      word.includes(address_input.toLowerCase()),
    );

    return suggestion_filter;
  }, [address_input, suggestions]);

  // Derived state to determine if the suggestion dropdown should be visible
  let suggest_open =
    !is_user_closed_menu &&
    address_input.trim() !== "" &&
    suggestions_display.length !== 0;

  useEffect(() => {
    set_is_user_closed_menu(false);
  }, [address_input]);

  return (
    <>
      <div className={`${style.address_box} `}>
        <div className="box">
          <input
            type="text"
            placeholder="Address"
            {...register("address_info.address")}
          />
          <i className="fa-solid fa-magnifying-glass"></i>

          {/* Suggestion Menu */}
          <div
            className={`${style.suggestions} ${suggest_open ? style.open_menu : ""}`}
          >
            <div className={style.title}>
              <p>Suggestions</p>
              <button
                type="button"
                onClick={() => set_is_user_closed_menu(true)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className={style.suggestion_span}>
              {suggestions_display.map((word, index) => {
                return (
                  <span
                    onClick={() => {
                      setValue("address_info.address", word);
                      set_is_user_closed_menu(true); // Close menu after selection
                    }}
                    key={index}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        {errors.address_info?.address && (
          <Form_errors_message message={errors.address_info?.address.message} />
        )}
      </div>
    </>
  );
};

export default Suggestions_part;
