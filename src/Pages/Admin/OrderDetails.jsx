import React, { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/orderServices";
import { MdErrorOutline } from "react-icons/md";

const OrderDetails = () => {
  const { orderId } = useParams();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const order = await getOrderById(orderId);
        setOrder(order);
      } catch (error) {
        console.error("Get Order By Id Errors:", error);
        setErrors("Something went wrong, please try again.");
      } finally {
        setLoading(false);
      }
    };
    getOrderData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="w-full h-full flex-center min-h-100">
        <LuLoaderCircle className="text-orange text-5xl animate-spin " />
      </div>
    );
  }

  if (errors) {
    return (
      <div className="w-full h-full flex-center-col gap-5 min-h-100">
        <MdErrorOutline className="text-7xl text-gray" />
        <div className="text-center">
          <h1 className="text-lg font-semibold">Oops!</h1>
          <p className="text-sm  text-gray">{errors}</p>
        </div>
        <button className="px-2.5 py-1.5 rounded-sm border border-border bg-white hover:shadow-sm">
          Go To Orders
        </button>
      </div>
    );
  }

  if (order) {
    return <div>OrderDetails</div>;
  }
};

export default OrderDetails;
