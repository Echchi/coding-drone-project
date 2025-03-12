import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  allStudentsCodeActiveState,
  allStudentsDroneActiveState,
  selectedScreenState,
} from "../../../shared/state/atom";

export const useStudentScreen = (index: number) => {
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
      id: index + 1,
      name: `학생 ${index + 1}`,
    }));
  };

  const toggleCodeActive = () => setCodeActive(!codeActive);
  const toggleDroneActive = () => setDroneActive(!droneActive);

  return {
    codeActive,
    droneActive,
    handleScreenClick,
    toggleCodeActive,
    toggleDroneActive,
  };
};
