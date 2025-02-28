import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ControlButtons from "../screens/ControlButtons.tsx";
import NotificationModal from "../../../shared/ui/NotificationModal.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allStudentsCodeActiveState,
  allStudentsDroneActiveState,
} from "../../../shared/state/atom.ts";
import { useLecture } from "../../../shared/context/lectureProvider.tsx";

const AllControlButtons = () => {
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [allStudentsCodeActive, setAllStudentsCodeActive] = useRecoilState(
    allStudentsCodeActiveState,
  );
  const [allStudentsDroneStop, setAllStudentsDroneActive] = useRecoilState(
    allStudentsDroneActiveState,
  );

  const { hasSavedLecture } = useLecture();
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
      <button
        className="relative py-3 px-6 font-semibold text-lg bg-stone-50 text-stone-500 rounded-xl shadow-lg disabledBtn"
        onClick={() => setIsControlOpen(!isControlOpen)}
        disabled={!hasSavedLecture}
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
            style={{
              transform: "translate(-50%, -50%)",
              top: "270%",
              left: "50%",
            }}
            className="z-10 rounded-lg absolute bg-stone-50 w-48 h-fit shadow-lg flex flex-col justify-center items-center space-y-4 p-4"
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
      {modalContent && (
        <NotificationModal content={`모든 학생의 ${modalContent}`} />
      )}
    </>
  );
};

export default AllControlButtons;
