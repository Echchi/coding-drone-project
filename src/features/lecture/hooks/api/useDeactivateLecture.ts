import { useMutation, useQuery } from "@tanstack/react-query";
import { ILectureParams } from "../../../../shared/types/lecture.ts";
import { lectureApi } from "../../api.ts";

export const useDeactivateLecture = () => {
  return useMutation({
    mutationFn: ({ lectureId, active }: ILectureParams) =>
      lectureApi.deActiveLecture({ lectureId, active }),
  });
};
