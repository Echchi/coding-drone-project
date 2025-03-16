import React, { useRef, useEffect } from "react";
import { cls } from "../../../shared/utils/cls.ts";
import ControlButtons from "./ControlButtons.tsx";
import { useStudentScreen } from "../../../features/instructor/hooks/useStudentScreen";
import { IStudent } from "../../../shared/types/student.ts";
import { STATUS, DroneStatus } from "../../../shared/constants/status.ts";
import MonacoEditor from "@monaco-editor/react";
import { useInstructorSocket } from "../../../features/instructor/hooks/useInstructorSocket.ts";

interface IScreenProps {
  student: IStudent;
}

export default function Screen({ student }: IScreenProps) {
  const { codeActive, droneActive, handleScreenClick, toggleCodeActive, toggleDroneActive } = useStudentScreen({
    studentId: student.studentId,
    name: student.name || `아이디 ${student.studentId}`,
  });

  return (
    <div
      key={`screen_${student.studentId}`}
      className={cls(
        "w-[95%] h-[95%] rounded-lg shadow-lg flex flex-col transition-all cursor-pointer hover:scale-[102%] hover:shadow-xl",
        !codeActive && !droneActive ? "ring-offset-1 ring ring-cyan-500" : "",
        codeActive ? "ring-offset-1" : !droneActive ? "ring ring-cyan-500" : "ring ring-blue-500",
        droneActive ? "ring-offset-1" : !codeActive ? "ring ring-cyan-500" : "ring ring-green-500",
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
      <div className="grow relative rounded-b-lg overflow-y-auto h-full">
        <MonacoEditor
          height="80%"
          defaultLanguage="python"
          theme="light"
          value={student?.code || ""}
          className="font-JetBrains"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 12,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: "off",
            renderLineHighlight: "none",
            overviewRulerBorder: false,
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
            },
            domReadOnly: true,
            cursorStyle: "line",
            cursorBlinking: "solid",
          }}
        />
        {!student?.isConnected && (
          <div className="absolute inset-0 w-full h-full bg-stone-500 rounded-b-lg flex flex-col justify-center items-center text-white font-bold text-xl">
            <p>연결되지않음</p>
          </div>
        )}
        <div className="bottom-0 right-0 pr-2 absolute w-full h-9 rounded-t-lg flex justify-end items-center bg-white">
          <div className="flex space-x-2 w-3/5">
            <ControlButtons
              codeActive={codeActive}
              handleCodeOnClick={(event) => toggleCodeActive(event)}
              droneActive={droneActive}
              handleDroneOnClick={(event) => toggleDroneActive(event)}
              size="sm"
              disabled={!student?.isConnected}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
