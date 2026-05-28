import React from "react";

const OurFeatures = () => {
  return (
    <div className="py-10 lg:px-10 2xl:px-20 border border-border rounded-md relative flex-center">
      <h2 className="legend absolute leading-4 -top-1.5 text-center left-[50%] translate-x-[-50%] min-w-55 bg-white text-xs uppercase font-bold">
        The Benefits of Choosing Us
      </h2>
      <img
        className="max-w-[80%] 2xl:max-w-full"
        src="/assets/images/policy-detailpage.avif"
        alt=""
      />
    </div>
  );
};

export default React.memo(OurFeatures);
