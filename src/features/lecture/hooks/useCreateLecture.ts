import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { codeModalState, codeState } from "../../../shared/state/atom.ts";
import { useEffect, useState } from "react";
import { MESSAGES } from "../../../shared/constants/messages.ts";
import { useGenerateCodeApi } from "./useGenerateCodeApi.ts";
import { useCreateLectureApi } from "./useCreateLectureApi.ts";

export const useCreateLecture = () => {
  const { isLoading: isCreateLectureLoading, mutate } = useCreateLectureApi();
  const {
    data,
    isLoading: isGenerateCodeLoading,
    refetch,
  } = useGenerateCodeApi();

  const recoilSavedCode = useRecoilValue(codeState);
  const setSavedCode = useSetRecoilState(codeState);
  const sessionSavedCode = sessionStorage.getItem("code") || "";
  const savedCode = sessionSavedCode || recoilSavedCode;
  const [isOpen, setIsOpen] = useRecoilState(codeModalState);
  const [code, setCode] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!savedCode) setIsOpen(true);
  }, [savedCode]);

  useEffect(() => {
    if (!savedCode && data && data.code) {
      setCode(data.code);
    }
  }, [data, savedCode]);

  const handleClickCreateButton = () => {
    const instructorId = sessionStorage.getItem("instructorId");
    if (!instructorId) {
      window.location.href = "/";
      return;
    }
    mutate(
      { instructorId, code },
      {
        onSuccess: (data) => {
          sessionStorage.setItem("code", data.code);
          setSavedCode(data.code);
          setError("");
        },
        onError: () => {
          setError(MESSAGES.AUTH_ERROR.INVALID_CREDENTIALS);
        },
      },
    );
  };
  const handleCloseModal = () => {
    if (savedCode) {
      setIsOpen(false);
    }
  };

  return {
    isCreateLectureLoading,
    isGenerateCodeLoading,
    refetch,
    isOpen,
    error,
    savedCode,
    setIsOpen,
    handleClickCreateButton,
    handleCloseModal,
    code,
  };
};
