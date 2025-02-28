import { ILectureParams } from "../../../shared/types/lecture.ts";
import { MESSAGES } from "../../../shared/constants/messages.ts";
import { useCreateLectureMutation } from "./api/useCreateLectureMutation.ts";

export const useCreateLecture = () => {
  const { isLoading: isCreateLectureLoading, mutate } =
    useCreateLectureMutation();

  const createLecture = (
    code: string,
    onSuccess: (data: ILectureParams) => void,
    onError: (error: string) => void,
  ) => {
    const instructorId = sessionStorage.getItem("instructorId");
    if (!instructorId) {
      window.location.href = "/";
      return;
    }

    mutate(
      { instructorId, code },
      {
        onSuccess,
        onError: () => onError(MESSAGES.AUTH_ERROR.INVALID_CREDENTIALS),
      },
    );
  };

  return { isCreateLectureLoading, createLecture };
};
