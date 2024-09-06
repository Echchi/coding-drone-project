import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-screen bg-lime-600 flex *:max-w-xl">
      <Outlet />
    </div>
  );
};

export default Layout;
