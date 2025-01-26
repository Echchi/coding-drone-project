import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreateLectureParams } from "../../../shared/types/lecture.ts";
import { lectureApi } from "../api.ts";

export const useCreateLecture = () => {
  return useMutation({
    mutationFn: (params: ICreateLectureParams) =>
      lectureApi.createLecture(params),
  });
};
