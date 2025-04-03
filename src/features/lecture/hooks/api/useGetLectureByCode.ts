import { useQuery } from "@tanstack/react-query";
import { lectureApi } from "../../api.ts";

export const UseGetLectureByCode = (code: string) => {
  return useQuery({
    queryKey: ["getLectureByCode", code],
    queryFn: () => lectureApi.getLectureByCode(code),
    enabled: !!code,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
