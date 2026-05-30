import React, { useState } from "react";
import DashboardHead from "./DashboardHead";
import StatsCards from "./StatsCards";
import { FaDollarSign, FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineCube } from "react-icons/hi";

const statsData = {
  week: [
    {
      id: 1,
      title: "Total Sales",
      value: "EGP 77,496",
      change: 18.6,
    },
    {
      id: 2,
      title: "Total Orders",
      value: "245",
      change: 12.4,
    },
    {
      id: 3,
      title: "Total Products",
      value: "512",
      change: 8.2,
    },
    {
      id: 4,
      title: "Total Customers",
      value: "1,342",
      change: 15.7,
    },
  ],
  month: [
    {
      id: 1,
      title: "Total Sales",
      value: "EGP 312,800",
      change: 22.3,
    },
    {
      id: 2,
      title: "Total Orders",
      value: "980",
      change: 17.1,
    },
    {
      id: 3,
      title: "Total Products",
      value: "512",
      change: 4.5,
    },
    {
      id: 4,
      title: "Total Customers",
      value: "5,210",
      change: 19.2,
    },
  ],
  year: [
    {
      id: 1,
      title: "Total Sales",
      value: "EGP 3,748,200",
      change: 31.5,
    },
    {
      id: 2,
      title: "Total Orders",
      value: "11,760",
      change: 24.8,
    },
    {
      id: 3,
      title: "Total Products",
      value: "512",
      change: 6.3,
    },
    {
      id: 4,
      title: "Total Customers",
      value: "62,500",
      change: 28.4,
    },
  ],
};

const cardsStyle = [
  { color: "#FF5A1F", icon: <FaDollarSign /> },
  { color: "#3B82F6", icon: <FiShoppingCart /> },
  { color: "#22C55E", icon: <HiOutlineCube /> },
  { color: "#A855F7", icon: <FaRegUser /> },
];

const DashboardStats = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedPeriod, setPeriod] = useState({
    key: "week",
    label: "This Week",
  });

  const cards = statsData[selectedPeriod.key];
  return (
    <>
      <DashboardHead
        dropDownOpen={dropDownOpen}
        setDropDownOpen={setDropDownOpen}
        selectedPeriod={selectedPeriod}
        setPeriod={setPeriod}
      />
      <StatsCards cards={cards} cardsStyle={cardsStyle} />
    </>
  );
};

export default DashboardStats;
