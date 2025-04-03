import React from "react";
import { cls } from "../../../shared/utils/cls";
import { IStudent } from "../../../shared/types/student";
import Screen from "../../../pages/instructor/screens/Screen";

interface IStudentGridProps {
  division: string;
  students: IStudent[];
}

export const StudentGrid = ({ division, students }: IStudentGridProps) => {
  return (
    <div
      className={cls(
        "w-full h-[95%] grid gap-3 overflow-y-auto self-center place-items-center",
        division === "4x3"
          ? "grid-cols-4 grid-rows-3"
          : division === "4x4"
            ? "grid-cols-4 grid-rows-4"
            : division === "5x4"
              ? "grid-cols-5 grid-rows-4"
              : "grid-cols-4 grid-rows-3"
      )}
    >
      {students.length > 0 ? (
        students.map((student) => <Screen key={student.studentId} student={student} />)
      ) : (
        <div className="col-span-full row-span-full flex justify-center items-center">
          <div className="rounded-lg p-8 bg-white shadow-lg">
            <p className="text-2xl font-bold text-center">접속한 학생이 없습니다</p>
          </div>
        </div>
      )}
    </div>
  );
};
