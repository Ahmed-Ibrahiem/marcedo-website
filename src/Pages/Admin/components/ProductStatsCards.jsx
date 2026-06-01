import React, { useEffect, useState, memo } from "react";
import StatsCards from "./StatsCards";
import { FaDollarSign, FaRegUser } from "react-icons/fa6";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { HiOutlineCube, HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { getProductsStats } from "../../../services/ProductsDashboardServices";

const cardsStyle = [
  {
    color: "#FF5A1F",
    icon: <HiOutlineCube />,
  },

  {
    color: "#22C55E",
    icon: <HiOutlineCube />,
  },

  {
    color: "#F59E0B",
    icon: <MdOutlineLocalOffer />,
  },

  {
    color: "#EF4444",
    icon: <FiShoppingBag />,
  },

  {
    color: "#7C3AED",
    icon: <HiOutlineUserGroup />,
  },
];

const ProductStatsCards = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getProductsStats();

      if (stats.length > 0) setCards(stats);
    };
    fetchStats();
  }, []);

  return (
    <>
      {cards && (
        <StatsCards
          cards={cards}
          cardsStyle={cardsStyle}
          style={"flex! flex-wrap"}
          cardStyle={"min-w-[250px] grow"}
          timePeriod={{ key: "week" }}
        />
      )}
    </>
  );
};

export default React.memo(ProductStatsCards);
