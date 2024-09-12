import { Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
  return (
    <div className="w-full h-dvh bg-lime-600 flex justify-center items-center">
      <Outlet />
      <div className="absolute bottom-0 left-0 p-4">
        <img className="w-10" src="/public/assets/logo.png" alt="Logo" />
      </div>
    </div>
  );
};

export default Layout;
