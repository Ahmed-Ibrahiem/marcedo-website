import React, { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { getOrderById, updateOrder } from "../../services/orderServices";
import { MdErrorOutline } from "react-icons/md";
import CustomerInfo from "./components/order-details/CustomerInfo";
import DeliveryInfo from "./components/order-details/DeliveryInfo";
import OrderItems from "./components/order-details/OrderItems";
import PaymentInfo from "./components/order-details/PaymentInfo";
import OrderNotes from "./components/order-details/OrderNotes";
import OrderSummery from "./components/order-details/OrderSummery";
import OrderTimeline from "./components/order-details/OrderTimeline";
import { FaPrint } from "react-icons/fa6";
import DropDownList from "./components/DropDownList";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import Success_Toast from "../../Components/ui/confirm-message/Success_Toast";

const statusList = [
  { id: "pending", name: "pending" },
  { id: "processing", name: "processing" },
  { id: "shipping", name: "shipping" },
  { id: "delivered", name: "delivered" },
  { id: "cancelled", name: "cancelled" },
];

const statusFlow = [
  "pending",
  "processing",
  "shipping",
  "delivered",
  "cancelled",
];

const getAvailableStatuses = (currentStatus) => {
  const currentIndex = statusFlow.indexOf(currentStatus);
  return [...statusFlow.slice(currentIndex + 1), "cancelled"];
};

const OrderDetails = () => {
  const { orderId } = useParams();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState("");
  const [availabeStatus, setAvailableStatus] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const order = await getOrderById(orderId);
        setOrder(order);
        // Get Available Status
        setAvailableStatus(getAvailableStatuses(order.status));
        // Get Notes
        if (!order?.notes || order?.notes === undefined) {
          setNotes([]);
        } else {
          setNotes(order.notes);
        }
        // update status
        setUpdatingStatus(order.status);
      } catch (error) {
        console.error("Get Order By Id Errors:", error);
        setErrors("Something went wrong, please try again.");
      } finally {
        setLoading(false);
      }
    };
    getOrderData();
  }, [orderId]);

  const [notes, setNotes] = useState([]);

  const saveUpdatingOrderData = async () => {
    if (saveLoading) return;
    const timeline = order.timeline;
    const updatingStatusIndex = statusFlow.indexOf(updatingStatus);
    let newTimeline = {};
    statusFlow.forEach((sta, index) => {
      // first check is status already exist in old timeline or not
      if (timeline[sta]) {
        newTimeline[sta] = timeline[sta];
        return;
      }

      if (index <= updatingStatusIndex) {
        newTimeline[sta] = serverTimestamp();
        return;
      }
    });

    const updatingOrder = {
      ...order,
      status: updatingStatus,
      timeline: newTimeline,
      notes,
      updated_at: serverTimestamp(),
    };

    setSaveLoading(true);
    try {
      const newOrder = await updateOrder(updatingOrder);

      toast(
        <Success_Toast
          message={`Order #${newOrder.id} was updating Successfully`}
        />,
      );
      setOrder(newOrder);
    } catch (error) {
      console.error("Update Order Error:", error);
    } finally {
      setSaveLoading(false);
    }
  };

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
    return (
      <div className="h-full flex-start-col invoice-section">
        {/* Head */}
        <div className="mb-2.5 w-full flex-between gap-2.5 flex-wrap">
          <div>
            <p className="text-xs text-gray mb-1">Orders {">"} Order Details</p>
            <div className="flex-start gap-2.5 flex-wrap">
              <h1 className="font-semibold">Order #{order.id}</h1>
              <span
                className={`text-sm p-1 px-2 font-semibold rounded-sm ${
                  updatingStatus === "pending"
                    ? "bg-orange-100 text-orange"
                    : updatingStatus === "processing"
                      ? "bg-blue-100 text-blue-500"
                      : updatingStatus === "delivered"
                        ? "bg-green-100 text-green"
                        : updatingStatus === "shipping"
                          ? "bg-amber-100 text-amber-500"
                          : "text-red-500 bg-red-100"
                }`}
              >
                {updatingStatus}
              </span>
            </div>
          </div>
          <div className="flex-start gap-3 flex-wrap text-sm ">
            <button
              onClick={() => window.print()}
              className="flex-start gap-1.5 px-2.5 py-1.5 rounded-sm border border-border bg-gray-200 "
            >
              <FaPrint />
              <span>Print Invoice</span>
            </button>
            <DropDownList
              currentSelect={"Update Status"}
              list={statusList.filter((st) => availabeStatus.includes(st.id))}
              listStyle={"bg-orange! text-white! border-0! w-35!"}
              opionsStyle={"w-full! text-black!"}
              optionFun={(item) => setUpdatingStatus(item.id)}
            />
            <button
              disabled={saveLoading}
              onClick={saveUpdatingOrderData}
              className="flex-start gap-1.5 px-2.5 py-1.5 rounded-sm bg-orange text-white "
            >
              <span>Save Update</span>
            </button>
          </div>
        </div>

        <div className="grid gap-3.5 grid-cols-1 2xl:grid-cols-3 w-full grow">
          {/* Order Info */}
          <div className="2xl:col-span-2 max-xl:flex max-xl:flex-col xl:grid! xl:grid-cols-2 gap-3.5">
            {/* Customer Info */}
            <CustomerInfo user={order.user} />
            {/* Delivery Info */}
            <DeliveryInfo delivery={order.delivery} />
            {/* Items Info */}
            <div className="col-span-2 w-full ">
              <OrderItems
                items={order.items}
                totalPrice={Math.round(+order.pricing.total)}
              />
            </div>
            {/* Payment Info */}
            <PaymentInfo payment={order.payment} />
            {/* Order Notes */}
            <OrderNotes notes={notes} setNotes={setNotes} />
          </div>
          <div className="flex-start-col gap-3.5 w-full">
            <OrderSummery
              pricing={order.pricing}
              wantsEmailUpdates={order.wantsEmailUpdates}
              orderId={order.id}
            />

            <OrderTimeline order={order} />
          </div>
        </div>

        {/* Loading Saving */}
        {saveLoading && (
          <div className="fixed inset-0 w-full h-full flex-center-col gap-5 z-50 bg-white">
            <LuLoaderCircle className="animate-spin text-6xl text-orange" />
            <p className="text-gray">Saving Updates...</p>
          </div>
        )}
      </div>
    );
  }
};

export default OrderDetails;
