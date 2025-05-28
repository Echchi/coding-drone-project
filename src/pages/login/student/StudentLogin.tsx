import { useEffect, useMemo, useState } from "react";
import Input from "../../../shared/ui/Input.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { AnimatePresence, motion } from "framer-motion";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MainButton from "../../../shared/ui/MainButton.tsx";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../../shared/utils/debounce.ts";
import { useLectureConnectMutation } from "../../../features/student/hooks/api/useLectureConnectMutation.ts";
import { UseGetLectureByCode } from "../../../features/lecture/hooks/api/useGetLectureByCode.ts";
import { useLecture } from "../../../shared/context/lectureProvider.tsx";
import { useStudentLogin } from "../../../features/student/hooks/useStudentLogin.ts";
import { useStudentSocket } from "../../../features/student/hooks/useStudentSocket.ts";

const StudentLogin = () => {
  const {
    form,
    errors,
    codeCheck,
    handleOnChangeCode,
    handleOnChangeName,
    handleLoginOnClick,
  } = useStudentLogin();

  return (
    <div className="w-2/3 space-y-3">
      <div className="w-full mt-10">
        <Input
          type={"text"}
          maxLength={10}
          icon={<FontAwesomeIcon icon={faLock} />}
          placeholder="접속 코드"
          onChange={(event) => handleOnChangeCode(event.target.value)}
          value={form.code}
          errorMessage={errors.code}
        />
      </div>
      <AnimatePresence mode="popLayout">
        {codeCheck && (
          <motion.div
            id={`name`}
            key={`name`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Input
              type={"text"}
              maxLength={10}
              icon={<FontAwesomeIcon icon={faUser} />}
              placeholder="이름"
              value={form.name}
              onChange={(event) => handleOnChangeName(event.target.value)}
              errorMessage={errors.name}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <MainButton
        title={"시작하기"}
        onClick={handleLoginOnClick}
        className={"!mt-6"}
        disabled={!codeCheck || form.name.trim().length === 0}
      />
    </div>
  );
};

export default StudentLogin;
