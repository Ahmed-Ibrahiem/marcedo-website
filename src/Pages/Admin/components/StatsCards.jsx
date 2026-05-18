import { FaDollarSign, FaCube, FaRegUser } from "react-icons/fa6";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { HiOutlineCube } from "react-icons/hi";
import LineChart from "../../../Components/ui/LineChart";
import { useState } from "react";
import DashboardHead from "./DashboardHead";

const StatsCards = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedPeriod, setPeriod] = useState({
    key: "week",
    label: "This Week",
  });
  const mokeData = [
    {
      title: "Total Sales",
      value: "EGP 77,496",
      avarage: "18.6%",
    },
    {
      title: "Total Orders",
      value: "245",
      avarage: "12.4%",
    },
    {
      title: "Total Products",
      value: "512",
      avarage: "8.2%",
    },
    {
      title: "Total Customers",
      value: "1.342",
      avarage: "15.7%",
    },
  ];

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

  const cards = statsData[selectedPeriod.key];

  const cardsStyle = [
    { color: "#FF5A1F", icon: <FaDollarSign /> },
    { color: "#3B82F6", icon: <FiShoppingCart /> },
    { color: "#22C55E", icon: <HiOutlineCube /> },
    { color: "#A855F7", icon: <FaRegUser /> },
  ];

  return (
    <>
      <DashboardHead
        dropDownOpen={dropDownOpen}
        setDropDownOpen={setDropDownOpen}
        selectedPeriod={selectedPeriod}
        setPeriod={setPeriod}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 ">
        {cards.map((data, index) => {
          return (
            <div
              className="flex-start-col gap-2.5 p-4 relative rounded-md"
              key={index}
              style={{ background: `${cardsStyle[index].color}1A` }}
            >
              {/* card info */}
              <div className="top flex items-center gap-2.5">
                <div
                  className={`w-10.5 h-10.5 rounded-full flex-center text-lg text-white`}
                  style={{ background: cardsStyle[index].color }}
                >
                  {cardsStyle[index].icon}
                </div>
                <div className="flex-start-col">
                  <h1 className="text-xs text-gray ">{data.title}</h1>
                  <p className="font-bold text-lg text-danger">{data.value}</p>
                </div>
              </div>
              {/* avarage */}

              <div className="flex-start gap-1.5 text-xs text-gray">
                <span className="text-green font-bold">
                  <i className="fa-solid fa-arrow-up "></i> {data.change}
                </span>
                <p>vs last week</p>
              </div>

              <div className="absolute bottom-2.5 right-2.5 w-[25%]! xl:w-[30%]! ">
                <LineChart color={cardsStyle[index].color} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default StatsCards;
