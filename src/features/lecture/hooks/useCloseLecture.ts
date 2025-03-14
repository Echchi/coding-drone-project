import { useState } from "react";
import { useLecture } from "../../../shared/context/lectureProvider.tsx";
import { useDeactivateLecture } from "./api/useDeactivateLecture.ts";

export const UseCloseLecture = () => {
  const [isCloseLectureModalOpen, setIsCloseLectureModalOpen] = useState(false);
  const { resetSavedLecture, hasSavedLecture, savedLecture } = useLecture();
  const { mutate, data } = useDeactivateLecture();
  const handleClickCloseButton = () => {
    setIsCloseLectureModalOpen(false);
    mutate({ lectureId: savedLecture.lectureId, active: false });
    resetSavedLecture();
    /* 학생들과 통신 종료 */
  };
  return {
    isCloseLectureModalOpen,
    setIsCloseLectureModalOpen,
    handleClickCloseButton,
    hasSavedLecture,
  };
};

export default UseCloseLecture;
