import React, { useState } from "react";
import { cls } from "../../../shared/utils/cls.ts";
import ControlButtons from "./ControlButtons.tsx";
import { Screen } from "./Screen.tsx";
import AlertModal from "../../../shared/ui/AlertModal.tsx";
import { IStudent } from "../../../shared/types/student.ts";
import { useInstructorSocket } from "../../../features/instructor/hooks/useInstructorSocket.ts";

const ScreenGrid = ({ division }: { division: string }) => {
  const { studentList, sendMessage } = useInstructorSocket();

  return (
    <>
      <div
        className={cls(
          "w-full h-full grid gap-3",
          division === "4x3"
            ? "grid-cols-4 grid-rows-3"
            : division === "4x4"
              ? "grid-cols-4 grid-rows-4"
              : division === "5x4"
                ? "grid-cols-5 grid-rows-4"
                : "grid-cols-4 grid-rows-3"
        )}
      >
        {Object.values(studentList).length > 0 ? (
          Object.values(studentList).map((student: IStudent) => <Screen student={student} />)
        ) : (
          <div className="col-span-full row-span-full flex justify-center items-center">
            <div className="rounded-lg p-8 bg-white shadow-lg">
              <p className="text-2xl font-bold text-center">접속한 학생이 없습니다</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ScreenGrid;
