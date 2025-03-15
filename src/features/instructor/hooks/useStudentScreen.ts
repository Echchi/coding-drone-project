import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  allStudentsCodeActiveState,
  allStudentsDroneActiveState,
  selectedScreenState,
} from "../../../shared/state/atom";

interface IStudentScreenProps {
  studentId: string;
  name: string;
}

export const useStudentScreen = ({ studentId, name }: IStudentScreenProps) => {
  const [codeActive, setCodeActive] = useState(true);
  const [droneActive, setDroneActive] = useState(true);

  const allStudentsCodeActive = useRecoilValue(allStudentsCodeActiveState);
  const allStudentsDroneActive = useRecoilValue(allStudentsDroneActiveState);
  const setSelectedStudent = useSetRecoilState(selectedScreenState);

  useEffect(() => {
    setCodeActive(allStudentsCodeActive);
  }, [allStudentsCodeActive]);

  useEffect(() => {
    setDroneActive(allStudentsDroneActive);
  }, [allStudentsDroneActive]);

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
    setCodeActive(!codeActive);
  };
  const toggleDroneActive = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setDroneActive(!droneActive);
  };

  return {
    codeActive,
    droneActive,
    handleScreenClick,
    toggleCodeActive,
    toggleDroneActive,
  };
};
