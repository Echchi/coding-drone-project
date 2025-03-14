import { useRecoilValue } from "recoil";
import { studentListState } from "../atoms/studentListState";

export const useStudentList = () => {
  const students = useRecoilValue(studentListState);
  return { students };
};
