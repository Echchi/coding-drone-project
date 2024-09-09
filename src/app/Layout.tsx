import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-dvh bg-lime-600 flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Layout;
