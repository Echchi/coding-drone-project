import { useMutation, useQuery } from "@tanstack/react-query";
import { ILectureParams } from "../../../../shared/types/lecture.ts";
import { lectureApi } from "../../api.ts";

export const useCreateLectureMutation = () => {
  return useMutation({
    mutationFn: (params: ILectureParams) => lectureApi.createLecture(params),
  });
};
