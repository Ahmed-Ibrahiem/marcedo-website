import React from "react";
import { FaXmark } from "react-icons/fa6";

const AddNewBrandPopup = ({oldBrands , }) => {
  return (
    <div className="flex-center fixed top-0 left-0 w-full h-screen bg-black/50 cursor-crosshair z-50">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-120 h-90 bg-white rounded-sm p-2.5 cursor-auto"
      >
        <div className="flex-between gap-5">
          <h1 className="font-bold">Add New Brand</h1>
          <button className="w-8 h-8 text-sm rounded-sm border border-border flex-center hover:bg-black hover:text-white">
            <FaXmark />
          </button>
        </div>

        <div className="mt-5 flex-start-col gap-4">
          <div className={boxStyle}>
            <label className={labelStyle} htmlFor="name">
              Brand Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Brand Name"
              className={inputStyle}
            />
          </div>

          <div className={boxStyle}>
            <label className={labelStyle} htmlFor="name">
              Brand Link
            </label>
            <input
              type="text"
              placeholder="Enter Your Brand Link"
              className={inputStyle}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const boxStyle = `
flex-start-col w-full gap-1.5 text-sm
`;

const inputStyle = `
border border-border p-1.5 rounded-sm w-full outline-transparent focus:outline-1 focus:outline-gray  duration-500!
`;

const labelStyle = `
font-bold
`;

export default AddNewBrandPopup;
