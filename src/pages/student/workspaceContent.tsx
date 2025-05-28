import React from "react";
import Code from "./code/Code.tsx";
import Drone from "./drone/Drone.tsx";
import Chat from "./chat/Chat.tsx";
import InstructorCode from "../instructor/code/InstructorCode.tsx";
import { useRecoilValue } from "recoil";
import { selectedScreenState, studentListState } from "../../shared/state/atom.ts";
import { useAuth } from "../../shared/context/authContext";
import { IStudentEmitEvents } from "../../shared/types/socket.ts";

interface WorkspaceContentProps {
  onCodeChange?: (code: string) => void;
  onDroneStatusChange?: (status: string) => void;
  forceInstructorMode?: boolean;
  sendMessage: <T extends keyof IStudentEmitEvents>(event: T, data: IStudentEmitEvents[T]) => void;
}

const WorkspaceContent: React.FC<WorkspaceContentProps> = ({
  onCodeChange,
  onDroneStatusChange,
  forceInstructorMode = false,
  sendMessage,
}) => {
  const { role } = useAuth();
  const selectedStudent = useRecoilValue(selectedScreenState);
  const studentList = useRecoilValue(studentListState);

  // 강제 강사 모드를 허용하거나 실제 역할이 강사인 경우 강사 모드 활성화
  const isInstructor = forceInstructorMode || role === "instructor";
  const selectedStudentData = selectedStudent.id ? studentList[selectedStudent.id] : null;
  console.log("selectedStudentData", selectedStudentData);
  console.log("isInstructor", isInstructor);

  return (
    <div className="w-full h-full grid grid-cols-3 gap-x-10">
      <div className="col-span-2 min-h-0">
        {isInstructor && selectedStudent.id && selectedStudentData ? (
          <InstructorCode
            studentId={selectedStudent.id}
            studentName={selectedStudent.name}
            initialCode={selectedStudentData.code || ""}
            codeActive={selectedStudentData.codeActive ?? true}
            droneActive={selectedStudentData.droneActive ?? true}
            droneStatus={selectedStudentData.droneStatus || "disconnected"}
            sendMessage={sendMessage}
          />
        ) : (
          <Code />
        )}
      </div>
      <div className="w-full h-full hidden xl:flex flex-col gap-4">
        <div className="h-3/5 min-h-0">
          <Drone />
        </div>
        <div className="h-2/5 min-h-0 pt-10">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceContent;
