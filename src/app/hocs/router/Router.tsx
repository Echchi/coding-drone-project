import { createBrowserRouter } from "react-router-dom";
import InstructorControlPanel from "../../../pages/instructor/InstructorControlPanel.tsx";
import Workspace from "../../../pages/student/Workspace.tsx";
import NotFound from "../../../pages/NotFound.tsx";
import Layout from "../../Layout.tsx";
import Login from "../../../pages/login/Login.tsx";
import { AuthProvider } from "../../../shared/context/authContext.tsx";
import ProtectedRoute from "./protectedRoute.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Login /> },
      {
        path: "/control",
        element: <ProtectedRoute allowedRoles={["instructor"]} />,
        children: [{ index: true, element: <InstructorControlPanel /> }],
      },
      {
        path: "/workspace",
        element: <ProtectedRoute allowedRoles={["student", "instructor"]} />,
        children: [{ index: true, element: <Workspace /> }],
      },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);

export default Router;
