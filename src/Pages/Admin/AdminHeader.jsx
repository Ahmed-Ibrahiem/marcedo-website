import React from "react";
import Logo from "../../Components/ui/Logo/Logo";

const AdminHeader = () => {
  return (
    <header className="py-2.5! pr-5 lg:px-5! flex justify-between lg:grid grid-cols-[200px_1fr] border-b border-border bg-white ">
      <Logo logoStyle={"scale-60 sm:scale-70 lg:scale-90"} />
      {/* Header Content */}
      <div className="header-content grow flex-between gap-5">
        {/* Search Input */}
        <div className="search-bar border border-border rounded-full p-1! lg:p-2! lg:px-3.5!  lg:min-w-90 flex-between gap-2.5 text-sm! ">
          <input
            type="text"
            placeholder="Search for order, product, user..."
            className="grow border-none outline-none hidden lg:block"
          />
          <button type="button" className="text-gray">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {/* Right Section */}
        <section className="flex gap-5 lg:gap-10 items-center ">
          {/* Notfication */}
          <button className="text-gray text-xl">
            <i className="fa-solid fa-bell"></i>
          </button>
          {/* Portfolio */}
          <button className="flex items-center gap-2.5 text-xs hover:bg-hover-bg! cursor-pointer p-1.5! rounded-sm">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-center ">
              <img
                src="/assets/users/user 1.png"
                className="max-w-full"
                alt=""
              />
            </div>
            <div className="flex-col font-bold hidden lg:flex text-start">
              <h1>Admin</h1>
              <h3>Super Admin</h3>
            </div>
            <i className="fa-solid fa-angle-down hidden lg:block"></i>
          </button>
        </section>
      </div>
    </header>
  );
};

export default AdminHeader;
