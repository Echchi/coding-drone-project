import { useMutation } from "@tanstack/react-query";
import { instructorApi } from "../api.ts";
import { ILoginParams } from "../../../shared/types/instructor.ts";

export const useLogin = () => {
  return useMutation({
    mutationFn: (params: ILoginParams) => instructorApi.login(params),
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });
};
