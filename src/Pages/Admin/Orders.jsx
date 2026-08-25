import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/orderServices";
import OrdersStats from "./components/orders-components/OrdersStats";
import OrdersTable from "./components/orders-components/OrdersTable";
import { LuLoaderCircle } from "react-icons/lu";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getAllOrders = async () => {
      try {
        const res = await getOrders();

        setOrders(res);
      } catch (error) {
        console.error("Get Orders Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllOrders();
  }, []);

  return (
    <div className="flex-start-col gap-2.5 h-full">
      {/* Orders Header */}
      <header className="bg-transparent!">
        <h1 className="text-lg font-semibold">Orders</h1>
        <p className="text-sm text-gray">Manage and track customers orders</p>
      </header>

      {/* Orders Stats */}
      <OrdersStats orders={orders} />

      {/* Orders Table */}
      {loading ? (
        <div className="grow w-full flex-center min-h-50">
          <LuLoaderCircle className="animate-spin text-xl" />
        </div>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
};

export default Orders;
