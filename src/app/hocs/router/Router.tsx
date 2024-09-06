import { createBrowserRouter } from "react-router-dom";
import InstructorControlPanel from "../../../pages/InstructorControlPanel.tsx";
import StudentWorkspace from "../../../pages/StudentWorkspace.tsx";
import NotFound from "../../../pages/NotFound.tsx";
import Layout from "../../Layout.tsx";
import Login from "../../../pages/Login.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "/control", element: <InstructorControlPanel /> },
      { path: "/workspace", element: <StudentWorkspace /> },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);

export default Router;
