import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreateLectureParams } from "../../../shared/types/lecture.ts";
import { lectureApi } from "../api.ts";

export const useDeactivateLectureApi = () => {
  return useMutation({
    mutationFn: (lectureId: number) => lectureApi.deActiveLecture(lectureId),
  });
};
