import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  role: "instructor" | "student" | null;
  setRole: (role: "instructor" | "student" | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  setRole: () => {},
});

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

  return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
