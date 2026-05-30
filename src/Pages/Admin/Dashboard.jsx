import { useState } from "react";
import StatsCards from "./components/StatsCards.jsx";
import SalesOverview from "./components/statistics-area/SalesOverview.jsx";
import OrderOverview from "./components/statistics-area/OrderOverview.jsx";
import LowStockProducts from "./components/statistics-area/LowStockProducts.jsx";
import RecentOrder from "./components/quick-info/RecentOrder.jsx";
import TopSellingProducts from "./components/quick-info/TopSellingProducts.jsx";
import NewCustomers from "./components/quick-info/NewCustomers.jsx";
import DashboardStats from "./components/DashboardStats.jsx";

const Dashboard = () => {


  return (
    <main className=" flex flex-col gap-2.5 ">
     
      {/* Start stats cards */}
      <DashboardStats  />
      {/* Start Statistics area */}
      <div className="statistics-area flex flex-col xl:flex-row gap-2.5 flex-wrap">
        <SalesOverview />
        <OrderOverview />
        <LowStockProducts />
      </div>
      {/* Start Queck info */}
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-2.5 flex-wrap">
        <RecentOrder />
        <TopSellingProducts />
        <NewCustomers />
      </div>
    </main>
  );
};

export default Dashboard;
