import React from "react";
import Logo from "../../Components/ui/Logo/Logo";
import { FaAngleDown, FaBell } from "react-icons/fa6";

const AdminHeader = () => {
  return (
    <header className="py-2.5! pr-5 lg:px-5! flex justify-between lg:grid grid-cols-[200px_1fr] border-b border-border bg-white ">
      <Logo logoStyle={"scale-60 sm:scale-70 lg:scale-90"} />
      {/* Header Content */}
      <div className="header-content grow flex-between gap-5">
        {/* Right Section */}
        <section className="flex ml-auto gap-5 lg:gap-10 items-center ">
          {/* Notfication */}
          <button className="text-gray text-xl">
            <FaBell />
          </button>
          {/* Portfolio */}
          <button className="flex items-center gap-2.5 text-xs hover:bg-hover-bg! cursor-pointer p-1.5! rounded-sm">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-center ">
              <img
                src="/assets/users/user 1.png"
                className="max-w-full"
                alt=""
                loading="lazy"
              />
            </div>
            <div className="flex-col font-bold hidden lg:flex text-start">
              <h1>Admin</h1>
              <h3>Super Admin</h3>
            </div>
            <FaAngleDown className=" hidden lg:block" />
          </button>
        </section>
      </div>
    </header>
  );
};

export default AdminHeader;
