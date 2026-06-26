import React from "react";

const FormProgress = ({ currentStep }) => {
  const formSteps = [
    {
      name: "Basic Information",
    },
    {
      name: "Media",
    },
    {
      name: "Properties",
    },
    {
      name: "Price & Inventory",
    },
    {
      name: "Publish & Review",
    },
  ];

  return (
    <div className={`w-full sm:w-[80%] flex-between mx-auto gap-1  `}>
      {formSteps.map((step, index) => {
        return (
          <div
            className={`flex-start gap-1 ${index != 0 ? "grow" : ""}`}
            key={index}
          >
            {index != 0 && (
              <div
                className={`grow h-0.5 ${index + 1 < currentStep ? "bg-green-500" : "bg-gray/30"}`}
              ></div>
            )}
            <div className="step">
              <div
                className={`w-6 h-6 text-xs font-bold flex-center rounded-full relative ${index + 1 === currentStep ? "bg-orange text-white" : index + 1 < currentStep ? "bg-green-500 text-white" : "bg-gray-light text-gray"}`}
              >
                <span>{index + 1}</span>
                <p className="absolute -bottom-6 left-[50%] translate-x-[-50%] whitespace-nowrap text-gray! hidden md:block">
                  {step.name}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormProgress;
