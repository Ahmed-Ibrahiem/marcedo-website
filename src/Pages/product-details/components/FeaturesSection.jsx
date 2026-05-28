import React from "react";
import { TbLeaf, TbTool, TbRecycle, TbBulb } from "react-icons/tb";

const FeaturesSection = () => {
  const store_features = [
    {
      id: 1,
      icon: <TbLeaf />,
      title: "Eco-Friendly Materials",
      description:
        "We craft our products using responsibly sourced, environmentally friendly materials.",
    },
    {
      id: 2,
      icon: <TbTool />,
      title: "Effortless Assembly",
      description:
        "Thoughtfully designed for quick setup, requiring minimal effort and no extra tools.",
    },
    {
      id: 3,
      icon: <TbRecycle />,
      title: "Giving Back to Nature",
      description:
        "Every purchase contributes to reforestation efforts, helping restore green spaces.",
    },
    {
      id: 4,
      icon: <TbBulb />,
      title: "Sustainable Production",
      description:
        "Dedicated to reducing waste and promoting eco-conscious manufacturing practices.",
    },
  ];
  return (
    <div className="flex-center border-y border-border py-30 my-30">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7.5 w-[90%] ">
        {store_features.map((section) => {
          return (
            <div key={section.id} className="w-full flex-center-col gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-light flex-center text-3xl!">
                {section.icon}
              </div>
              <h3 className="font-bold">{section.title}</h3>
              <p className="w-[80%] text-sm text-gray">{section.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;
