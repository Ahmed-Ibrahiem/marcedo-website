import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useCartContext } from "./CartMenuContext";
import { useNavigate } from "react-router-dom";

/**
 * Payment form validation schema using Yup
 * Defines validation rules for all payment and delivery related fields
 * Includes conditional validation based on delivery type and payment method
 **/
const payment_schema = yup.object({
  contact_way: yup
    .string()
    .required("This Field is Required")
    .test(
      "email-or-phone",
      "Enter a valid email or Egyptian phone number",
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      },
    ),
  delivery_type: yup.string().required("Select Your Delivery Way"),
  address_info: yup.object().when("delivery_type", {
    is: "ship",
    then: () =>
      yup.object({
        country: yup.string().required("Please Select Country"),
        first_name: yup.string().required("This Field is Required"),
        last_name: yup.string().required("This Field is Required"),
        address: yup.string().required("This Field is Required"),
        city: yup.string().required("This Field is Required"),
        state: yup.string().required("This Field is Required"),
        zip_code: yup
          .string()
          .matches(/^\d+$/, "Zip Code must contain numbers only")
          .required("This Field is Required"),
      }),
    otherwise: () => yup.object().strip(),
  }),
  payment_type: yup.string().required("Please Select Payment Way"),
  credit_info: yup.object().when("payment_type", {
    is: "credit_card",
    then: () =>
      yup.object({
        card_number: yup
          .string()
          .required("This Filed is Required")
          .matches(/^\d{15,16}$/, "Card number must be 15 or 16 digits"),
        expiration_data: yup
          .date()
          .required("This Filed is Required")
          .typeError("This Field is required")
          .min(new Date(), "Please Enter expiration date valid"),
        cvv: yup
          .string()
          .required("This Filed is Required")
          .matches(/^\d{3,4}$/, "CVV must be 15 or 16 digits"),
        card_name: yup.string().required("This Field is Required"),
      }),
    otherwise: () => yup.object().strip(),
  }),
});

/**
 * Context object for checkout operations
 * Provides payment form state, suggestions, and pricing calculations
 **/
const checkout_context = createContext(null);

/**
 * Checkout Provider Component
 * Manages the entire checkout flow including form handling, address suggestions,
 * shipping costs, discounts, and order submission
 **/
const Checkout_provider = ({ children }) => {
  const [suggestions, set_suggestinos] = useState([]);
  const { cartItemsData, SubtotalItemsPrice, clearCartItems } =
    useCartContext();
  const navigate = useNavigate();

  /**
   * Effect hook to fetch address suggestions from JSON file
   * Converts all suggestions to lowercase for case-insensitive matching
   **/
  useEffect(() => {
    const get_data = async () => {
      const req = await axios.get("/Address.json");
      if (req.status === 200) {
        const res = req.data;
        const data = res.map((word) => word.toLowerCase());
        set_suggestinos(data);
      }
    };
    get_data();
  }, []);

  /**
   * Initialize React Hook Form with payment schema validation
   * Sets up form state with default values for all payment and delivery fields
   **/
  const payment_form = useForm({
    defaultValues: {
      contact_way: "",
      email_me: false,
      delivery_type: "ship",
      address_info: {
        country: "Select country",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
      },
      save_address_info_next: false,
      payment_type: "credit_card",
      credit_info: {
        card_number: "",
        expiration_data: "",
        cvv: "",
        card_name: "",
      },
    },
    mode: "onChange",
    resolver: yupResolver(payment_schema),
  });

  const [shopping_cost, set_shopping_cost] = useState(0);
  const [discount_info, set_discount_info] = useState(null);

  /**
   * Memoized total price calculation
   * Applies discount percentage if available
   * Combines subtotal, shipping cost, and applies discount
   **/
  const total = useMemo(() => {
    if (!discount_info) return SubtotalItemsPrice + shopping_cost;
    const price = SubtotalItemsPrice + shopping_cost;

    if (discount_info.type == "percentage") {
      return price - price * (discount_info.value / 100);
    }
  }, [shopping_cost, SubtotalItemsPrice, discount_info]);

  /**
   * Form submission handler
   * Creates order object with all customer, delivery, payment, and pricing information
   * Saves order to localStorage, clears cart, and navigates to success page
   **/
  const onSubmit = (data) => {
    const order = {
      id: crypto.randomUUID(),
      items: [...cartItemsData],
      customer: {
        contact: data.contact_way,
        wantsEmailUpdates: data.email_me,
      },

      delivery: {
        type: data.delivery_type,
        address:
          data.delivery_type === "ship"
            ? {
                country: data.address_info.country,
                firstName: data.address_info.first_name,
                lastName: data.address_info.last_name,
                address: data.address_info.address,
                city: data.address_info.city,
                state: data.address_info.state,
                zipCode: data.address_info.zip_code,
              }
            : null,
      },

      payment: {
        method: data.payment_type,
        details:
          data.payment_type === "credit_card"
            ? {
                cardNumber: data.credit_info.card_number,
                expirationDate: data.credit_info.expiration_data,
                cardHolderName: data.credit_info.card_name,
              }
            : null,
      },

      pricing: {
        dicount: discount_info ? discount_info : null,
        shopping_cost,
        total,
        SubtotalItemsPrice,
      },

      status: "pending",
      createAt: new Date().toISOString(),
    };

    localStorage.setItem("last_order", JSON.stringify(order));
    payment_form.reset();
    clearCartItems();
    console.log(order);
    navigate("/order-success");
  };

  /**
   * Context value object containing all state and methods
   * Exposed to child components through the provider
   **/
  const value = {
    payment_form,
    suggestions,
    onSubmit,
    shopping_cost,
    set_shopping_cost,
    discount_info,
    set_discount_info,
    total,
  };

  return (
    <checkout_context.Provider value={value}>
      {children}
    </checkout_context.Provider>
  );
};

/**
 * Custom hook to access checkout context
 * Throws error if used outside of Checkout_provider
 **/
export const use_checkout_context = () => {
  const context = useContext(checkout_context);
  if (!context) throw new Error("This must be used in provider");
  return context;
};

export default Checkout_provider;
