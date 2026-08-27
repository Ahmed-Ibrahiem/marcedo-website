import React from "react";

const SectionWrapper = ({ title, icon, sectionStyle, children }) => {
  return (
    <section
      className={`w-full rounded-sm bg-white shadow-sm p-2.5 flex-start-col gap-3.5 relative ${sectionStyle || ""}`}
    >
      {/* Title  */}
      <div className="flex-start gap-2.5  w-full">
        {icon}
        <h2 className="font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
};

export default SectionWrapper;
