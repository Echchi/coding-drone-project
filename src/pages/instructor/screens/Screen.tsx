import React from "react";
import { cls } from "../../../shared/utils/cls.ts";
import ControlButtons from "./ControlButtons.tsx";
import { useStudentScreen } from "../../../features/instructor/hooks/useStudentScreen";
import { IStudent } from "../../../shared/types/student.ts";
import { STATUS, DroneStatus } from "../../../shared/constants/status.ts";

interface IScreenProps {
  student: IStudent;
}

export const Screen = ({ student }: IScreenProps) => {
  const { codeActive, droneActive, handleScreenClick, toggleCodeActive, toggleDroneActive } = useStudentScreen({
    studentId: student.studentId,
    name: student.name || `아이디 ${student.studentId}`,
  });

  return (
    <div
      key={`screen_${student.studentId}`}
      className={cls(
        "w-full h-full rounded-lg shadow-lg flex flex-col transition-all cursor-pointer hover:scale-[103%] hover:shadow-xl",
        !codeActive && !droneActive ? "ring ring-cyan-500" : "",
        codeActive ? "" : !droneActive ? "ring ring-cyan-500" : "ring ring-blue-500",
        droneActive ? "" : !codeActive ? "ring ring-cyan-500" : "ring ring-green-500",
        !student?.isConnected ? "opacity-50" : ""
      )}
      onClick={handleScreenClick}
    >
      <div className="w-full h-9 rounded-t-lg flex justify-between items-center px-3 bg-gray-100">
        <span className="font-semibold">{student?.name || `아아디 ${student?.studentId}`}</span>
        <p className="flex items-center space-x-3">
          {student?.isConnected ? (
            <>
              <span>{STATUS.DRONE_STATUS[(student?.droneStatus as DroneStatus) || "disconnected"]}</span>
              <span
                className={cls(
                  "inline-block w-4 aspect-square rounded-full shadow",
                  student?.droneStatus === "error" || student.droneStatus === "disconnected"
                    ? "bg-rose-500"
                    : "bg-green-500"
                )}
              />
            </>
          ) : (
            <span>연결 안됨</span>
          )}
        </p>
      </div>
      <div className="grow bg-white relative rounded-b-lg text-xs font-JetBrains p-2">
        {student?.code || "console.log('hello');"}
        {!student?.isConnected && (
          <div className="absolute inset-0 w-full h-full bg-stone-500 rounded-b-lg flex flex-col justify-center items-center text-white font-bold text-xl">
            <p>연결되지않음</p>
          </div>
        )}
        <div className="z-10 bottom-2 right-2 absolute w-full h-9 rounded-t-lg flex justify-end items-center">
          <div className="flex space-x-2 w-2/5">
            <ControlButtons
              codeActive={codeActive}
              handleCodeOnClick={toggleCodeActive}
              droneActive={droneActive}
              handleDroneOnClick={toggleDroneActive}
              isSmall={true}
              disabled={!student?.isConnected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
