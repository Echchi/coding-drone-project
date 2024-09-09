import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import StudentLogin from "./student/StudentLogin.tsx";
import InstructorLogin from "./instructor/InstructorLogin.tsx";
const Login = () => {
  const [role, setRole] = useState<"student" | "instructor">("student");

  const handleInstructorOnClick = () => {
    role === "student" ? setRole("instructor") : setRole("student");
  };

  return (
    <div className="relative min-w-fit w-1/3 min-h-fit h-1/2 m-auto bg-amber-50 rounded-lg shadow flex flex-col justify-center items-center py-5">
      <p className="w-full text-4xl font-dunggeunmiso-b text-center text-lime-600">
        코딩 드론 플랫폼
        {role === "instructor" && <span className="text-xl">(강사)</span>}
      </p>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={role}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full h-fit flex justify-center items-center"
        >
          {role === "student" ? <StudentLogin /> : <InstructorLogin />}
        </motion.div>
      </AnimatePresence>
      <button
        className="absolute right-3 bottom-3 font-bold text-neutral-500 py-2 px-4 bg-neutral-300 rounded-lg"
        onClick={handleInstructorOnClick}
      >
        {role === "instructor" ? "학생 접속" : "강사 로그인"}
      </button>
    </div>
  );
};

export default Login;
