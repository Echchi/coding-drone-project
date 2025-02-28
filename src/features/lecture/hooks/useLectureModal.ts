import { useRecoilState } from "recoil";
import { codeModalState } from "../../../shared/state/atom.ts";
import { useEffect, useState } from "react";
import { useGenerateLectureCode } from "./api/useGenerateLectureCode.ts";
import { useCreateLecture } from "./useCreateLecture.ts";
import { useLecture } from "../../../shared/context/lectureProvider.tsx";
import { MESSAGES } from "../../../shared/constants/messages.ts";
import { useNavigate } from "react-router-dom";

export const useLectureModal = () => {
  const navigate = useNavigate();
  const { data, refetch, isGenerateCodeLoading } = useGenerateLectureCode();
  const { hasSavedLecture, setSavedLecture } = useLecture();
  const { isCreateLectureLoading, createLecture } = useCreateLecture();
  const [isCodeModalOpen, setIsCodeModalOpen] = useRecoilState(codeModalState);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hasSavedLecture && data?.code) {
      setCode(data.code);
    }
  }, [data, hasSavedLecture]);

  useEffect(() => {
    if (!hasSavedLecture) refetch();
  }, [hasSavedLecture]);

  const handleClickCreateButton = () => {
    const instructorId = sessionStorage.getItem("instructorId");
    if (!instructorId) {
      navigate("/", { replace: true });
      return;
    }

    createLecture(
      code,
      (data) => {
        sessionStorage.setItem("code", data.code || "");
        sessionStorage.setItem("lectureId", String(data.lectureId));

        setSavedLecture({
          lectureId: data.lectureId,
          code: data.code,
        });

        setError("");
      },
      () => {
        setError(MESSAGES.AUTH_ERROR.INVALID_CREDENTIALS);
      },
    );
  };

  const handleCloseModal = () => setIsCodeModalOpen(false);

  return {
    handleClickCreateButton,
    handleCloseModal,
    code,
    error,
    isCreateLectureLoading,
    isCodeModalOpen,
    setIsCodeModalOpen,
    isGenerateCodeLoading,
  };
};
