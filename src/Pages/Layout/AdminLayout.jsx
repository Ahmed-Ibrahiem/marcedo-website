import React, { useState } from "react";
import Logo from "../../Components/ui/Logo/Logo";
import AdminHeader from "../Admin/AdminHeader";
import AdminNavbar from "../Admin/AdminNavbar";
import { Outlet, useLocation } from "react-router-dom";
import ProductsTableControl from "../Admin/context/ProductsTableControl";

const AdminLayout = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="admin-dashboard bg-[#f5f7f9] flex flex-col min-h-screen">
      <AdminHeader />
      <main className="lg:grid xl:grid-cols-[200px_1fr] flex-1 ">
        <AdminNavbar currentPage={currentPage} />
        <section className="p-2.5 ">
          <ProductsTableControl>
            <Outlet />
          </ProductsTableControl>
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
