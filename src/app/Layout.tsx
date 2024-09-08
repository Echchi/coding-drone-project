import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-screen bg-lime-700 flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Layout;
