import { lectureApi } from "../api.ts";
import { useQuery } from "@tanstack/react-query";

export const useGenerateCodeApi = () => {
  return useQuery({
    queryKey: ["generateCode"],
    queryFn: () => lectureApi.generateCode(),
    enabled: false,
    refetchOnWindowFocus: false,
  });
};
