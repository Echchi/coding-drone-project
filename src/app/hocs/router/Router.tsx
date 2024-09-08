import { createBrowserRouter } from "react-router-dom";
import InstructorControlPanel from "../../../pages/InstructorControlPanel.tsx";
import Workspace from "../../../pages/student/Workspace.tsx";
import NotFound from "../../../pages/NotFound.tsx";
import Layout from "../../Layout.tsx";
import Login from "../../../pages/login/Login.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "/control", element: <InstructorControlPanel /> },
      { path: "/workspace", element: <Workspace /> },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);

export default Router;
