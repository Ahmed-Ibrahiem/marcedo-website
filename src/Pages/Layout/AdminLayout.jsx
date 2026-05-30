import React, { useState } from "react";
import Logo from "../../Components/ui/Logo/Logo";
import AdminHeader from "../Admin/AdminHeader";
import AdminNavbar from "../Admin/AdminNavbar";
import { Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="admin-dashboard bg-[#f5f7f9] flex flex-col 2xl:h-screen">
      <AdminHeader />
      <main className="lg:grid xl:grid-cols-[200px_1fr] flex-1 ">
        <AdminNavbar currentPage={currentPage} />
        <section className="p-4 w-full">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
