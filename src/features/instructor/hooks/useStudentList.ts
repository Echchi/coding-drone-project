// import { studentListState } from "../atoms/studentListState";
import { studentListState } from "../../../shared/state/atom";
import { useRecoilValue } from "recoil";

export const useStudentList = () => {
  const students = useRecoilValue(studentListState);

  // Object.values 사용하여 객체를 배열로 변환
  const studentArray = Object.values(students);

  return { students: studentArray };
};
