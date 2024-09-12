import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NotificationModal from "../../../widget/NotificationModal.tsx";
import { cls } from "../../../sahred/utils/cls.ts";
import { useRecoilState } from "recoil";
import {
  allStudentsCodeActiveState,
  allStudentsDroneActiveState,
} from "../../../features/control/atom.ts";
import ControlButtons from "../screens/ControlButtons.tsx";

const MasterControlButton = () => {
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [allStudentsCodeActive, setAllStudentsCodeActive] = useRecoilState(
    allStudentsCodeActiveState,
  );
  const [allStudentsDroneStop, setAllStudentsDroneActive] = useRecoilState(
    allStudentsDroneActiveState,
  );

  const handleClickCodeActive = () => {
    setAllStudentsCodeActive(!allStudentsCodeActive);
    if (allStudentsCodeActive) {
      setModalContent("코드 실행 버튼이 비활성화 됩니다");
    } else {
      setModalContent("코드 실행 버튼이 활성화 됩니다");
    }
  };
  const handleClickDroneActive = () => {
    setAllStudentsDroneActive(!allStudentsDroneStop);

    if (allStudentsDroneStop) {
      setModalContent("드론 제어 버튼이 비활성화 됩니다");
    } else {
      setModalContent("드론 제어 버튼이 활성화 됩니다");
    }
  };

  return (
    <>
      <div className="relative">
        <button
          className="py-3 px-6 font-semibold text-lg bg-stone-50 text-stone-500 rounded-xl shadow-lg"
          onClick={() => setIsControlOpen(!isControlOpen)}
        >
          전체제어
        </button>

        <AnimatePresence mode="popLayout">
          {isControlOpen && (
            <motion.div
              id={`control_menu`}
              key={`control_menu`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="z-30 top-14 right-0 rounded-lg absolute bg-stone-50 w-48 h-fit shadow-lg flex flex-col justify-center items-center space-y-4 p-4"
            >
              <ControlButtons
                codeActive={allStudentsCodeActive}
                handleCodeOnClick={handleClickCodeActive}
                droneActive={allStudentsDroneStop}
                handleDroneOnClick={handleClickDroneActive}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {modalContent && (
        <NotificationModal content={`모든 학생의 ${modalContent}`} />
      )}
    </>
  );
};

export default MasterControlButton;
