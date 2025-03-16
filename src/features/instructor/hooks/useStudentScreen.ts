import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  allStudentsCodeActiveState,
  allStudentsDroneActiveState,
  selectedScreenState,
  studentListState,
} from "../../../shared/state/atom";
import { useLecture } from "../../../shared/context/lectureProvider";
import { useInstructorSocket } from "./useInstructorSocket";

interface IStudentScreenProps {
  studentId: string;
  name: string;
}

export const useStudentScreen = ({ studentId, name }: IStudentScreenProps) => {
  const { savedLecture } = useLecture();
  const { sendMessage, studentList } = useInstructorSocket();
  const [codeActive, setCodeActive] = useState(true);
  const [droneActive, setDroneActive] = useState(true);

  const allStudentsCodeActive = useRecoilValue(allStudentsCodeActiveState);
  const allStudentsDroneActive = useRecoilValue(allStudentsDroneActiveState);
  const setSelectedStudent = useSetRecoilState(selectedScreenState);

  // 전체 학생 코드 활성화 상태 적용
  useEffect(() => {
    setCodeActive(allStudentsCodeActive);
  }, [allStudentsCodeActive]);

  // 전체 학생 드론 활성화 상태 적용
  useEffect(() => {
    setDroneActive(allStudentsDroneActive);
  }, [allStudentsDroneActive]);

  // 학생별 코드 및 드론 활성화 상태 동기화
  useEffect(() => {
    if (studentList && studentList[studentId]) {
      const student = studentList[studentId];

      // 학생별 코드 활성화 상태가 존재하면 적용
      if (student.codeActive !== undefined) {
        setCodeActive(student.codeActive);
      }

      // 학생별 드론 활성화 상태가 존재하면 적용
      if (student.droneActive !== undefined) {
        setDroneActive(student.droneActive);
      }
    }
  }, [studentList, studentId]);

  const handleScreenClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setSelectedStudent((prev) => ({
      ...prev,
      id: studentId,
      name: name,
    }));
  };

  const toggleCodeActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const newState = !codeActive;
    setCodeActive(newState);
    sendMessage("code:setActive", { lectureCode: savedLecture.code, studentId: studentId, active: newState });

    // 콘솔에 로깅 추가
    console.log(`코드 활성화 상태 변경 (${studentId}): ${newState}`);
  };

  const toggleDroneActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const newState = !droneActive;
    setDroneActive(newState);
    sendMessage("drone:setActive", { lectureCode: savedLecture.code, studentId: studentId, active: newState });

    // 콘솔에 로깅 추가
    console.log(`드론 활성화 상태 변경 (${studentId}): ${newState}`);
  };

  return {
    codeActive,
    droneActive,
    handleScreenClick,
    toggleCodeActive,
    toggleDroneActive,
  };
};
