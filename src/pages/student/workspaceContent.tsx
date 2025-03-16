import React from "react";
import Code from "./code/Code.tsx";
import Drone from "./drone/Drone.tsx";
import Chat from "./chat/Chat.tsx";

interface WorkspaceContentProps {
  onCodeChange: (code: string) => void;
  onDroneStatusChange: (status: string) => void;
}

const WorkspaceContent: React.FC<WorkspaceContentProps> = ({ onCodeChange, onDroneStatusChange }) => {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-x-10">
      <div className="col-span-2 min-h-0">
        <Code />
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
