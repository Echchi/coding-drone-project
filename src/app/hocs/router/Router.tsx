import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../../pages/login/Login.tsx";
import Workspace from "../../../pages/student/Workspace.tsx";
import InstructorControlPanel from "../../../pages/instructor/InstructorControlPanel.tsx";
import ProtectedRoute from "./protectedRoute.tsx";
import { AuthProvider } from "../../../shared/context/authProvider.tsx";
import { LectureProvider } from "../../../shared/context/lectureProvider.tsx";
import NotFound from "../../../pages/NotFound.tsx";
import Layout from "../../Layout.tsx";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LectureProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route
                path="control"
                element={<ProtectedRoute allowedRoles={["instructor"]} />}
              >
                <Route index element={<InstructorControlPanel />} />
              </Route>
              <Route
                path="workspace"
                element={<ProtectedRoute allowedRoles={["student", "instructor"]} />}
              >
                <Route index element={<Workspace />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </LectureProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
