import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  role: "instructor" | "student" | null;
}

const AuthContext = createContext<AuthContextType>({ role: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<"instructor" | "student" | null>(null);

  useEffect(() => {
    const instructorId = sessionStorage.getItem("instructorId");
    const studentId = sessionStorage.getItem("id");

    if (instructorId) {
      setRole("instructor");
    } else if (studentId) {
      setRole("student");
    } else {
      setRole(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
