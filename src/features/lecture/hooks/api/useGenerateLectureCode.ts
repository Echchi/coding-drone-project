import { useQuery } from "@tanstack/react-query";
import { lectureApi } from "../../api.ts";

export const useGenerateLectureCode = () => {
  return useQuery({
    queryKey: ["generateCode"],
    queryFn: () => lectureApi.generateCode(),
    enabled: false,
    refetchOnWindowFocus: false,
  });
};
