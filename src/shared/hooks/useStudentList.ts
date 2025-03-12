import { useRecoilState } from "recoil";
import { studentListState } from "../state/atom";
import { IStudent } from "../types/student";

export const useStudentList = () => {
  const [studentList, setStudentList] = useRecoilState(studentListState);

  const addStudent = (index: number, student: IStudent) => {
    setStudentList((prev) => ({
      ...prev,
      [index]: student,
    }));
  };

  const removeStudent = (index: number) => {
    setStudentList((prev) => {
      const newList = { ...prev };
      delete newList[index];
      return newList;
    });
  };

  const updateStudentCode = (index: number, code: string) => {
    setStudentList((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        code,
      },
    }));
  };

  const updateStudentDroneStatus = (index: number, status: string) => {
    setStudentList((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        droneStatus: status,
      },
    }));
  };

  return {
    studentList,
    addStudent,
    removeStudent,
    updateStudentCode,
    updateStudentDroneStatus,
  };
};
