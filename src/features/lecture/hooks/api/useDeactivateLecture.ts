import { useMutation } from "@tanstack/react-query";
import { lectureApi } from "../../api";
import { ILectureDeactivateParams } from "../../../../shared/types/lecture";

export const useDeactivateLecture = () => {
  return useMutation({
    mutationFn: ({ lectureId, active }: ILectureDeactivateParams) =>
      lectureApi.deActiveLecture({ lectureId, active }),
  });
};
