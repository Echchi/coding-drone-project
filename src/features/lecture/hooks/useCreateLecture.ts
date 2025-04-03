import { ILectureParams, ILectureResponse } from "../../../shared/types/lecture.ts";
import { MESSAGES } from "../../../shared/constants/messages.ts";
import { useCreateLectureMutation } from "./api/useCreateLectureMutation.ts";
import { useNavigate } from "react-router-dom";

export const useCreateLecture = () => {
  const navigate = useNavigate();
  const { isPending: isCreateLectureLoading, mutate } = useCreateLectureMutation();

  const createLecture = (
    code: string,
    onSuccess: (data: ILectureResponse) => void,
    onError: (error: string) => void
  ) => {
    const instructorId = sessionStorage.getItem("instructorId");
    if (!instructorId) {
      navigate("/", { replace: true });
      return;
    }

    mutate(
      { instructorId, code },
      {
        onSuccess,
        onError: () => onError(MESSAGES.AUTH_ERROR.INVALID_CREDENTIALS),
      }
    );
  };

  return { isCreateLectureLoading, createLecture };
};
