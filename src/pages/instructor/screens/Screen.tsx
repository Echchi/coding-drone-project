import React, { useEffect, useState } from "react";
import { cls } from "../../../sahred/utils/cls.ts";
import ControlButtons from "./ControlButtons.tsx";
import { useRecoilValue } from "recoil";
import {
  allStudentsCodeActiveState,
  allStudentsDroneActiveState,
} from "../../../features/control/atom.ts";

const Screen = ({ index }: { index: number }) => {
  const allStudentsCodeActive = useRecoilValue(allStudentsCodeActiveState);
  const allStudentsDroneActive = useRecoilValue(allStudentsDroneActiveState);
  const [codeActive, setCodeActive] = useState(true);
  const [droneActive, setDroneActive] = useState(true);
  useEffect(() => {
    if (!allStudentsCodeActive) {
      setCodeActive(allStudentsCodeActive);
    }
  }, [allStudentsCodeActive]);
  useEffect(() => {
    if (!allStudentsDroneActive) {
      setDroneActive(allStudentsDroneActive);
    }
  }, [allStudentsDroneActive]);
  return (
    <div
      key={`screen_${index}`}
      className="w-full h-full rounded-lg shadow-lg flex flex-col"
    >
      <div className="w-full h-9 rounded-t-lg flex justify-between items-center px-3">
        <span className="font-semibold">학생 {index + 1}</span>
        <p className="flex items-center space-x-3">
          <span>
            {index !== 9
              ? `${Math.min(Math.round((Math.random() + 0.1) * 100), 100)} %`
              : "-"}
          </span>
          {index !== 9 && (
            <span
              className={cls(
                "inline-block w-4 aspect-square rounded-full shadow",
                index === 5 || index === 10 ? "bg-rose-500" : "bg-green-500",
              )}
            />
          )}
        </p>
      </div>
      <div className="grow bg-white relative rounded-b-lg">
        {index === 9 && (
          <div className="absolute w-full h-full bg-stone-500 rounded-b-lg flex flex-col justify-center items-center text-white font-bold text-xl">
            <p>연결 되지 않음</p>
          </div>
        )}
        <div className="z-10 bottom-2 right-2 absolute w-full h-9 rounded-t-lg flex justify-end items-center">
          <div className="flex space-x-2 w-2/5">
            <ControlButtons
              codeActive={codeActive}
              handleCodeOnClick={() => setCodeActive(!codeActive)}
              droneActive={droneActive}
              handleDroneOnClick={() => setDroneActive(!droneActive)}
              isSmall={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen;
