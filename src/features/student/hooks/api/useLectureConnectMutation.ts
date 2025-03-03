import { useMutation } from "@tanstack/react-query";
import { studentApi } from "../../api.ts";
import { ILectureConnectParams } from "../../../../shared/types/student.ts";

export const useLectureConnectMutation = () => {
  return useMutation({
    mutationFn: (params: ILectureConnectParams) =>
      studentApi.lectureConnect(params),
  });
};
