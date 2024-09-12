import React from "react";
import Code from "./code/Code.tsx";
import Drone from "./drone/Drone.tsx";
import Chat from "./chat/chat.tsx";

const WorkspaceContent = () => {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-x-4">
      <div className="col-span-2 flex flex-col">
        <Code />
      </div>
      <div className="w-full h-full hidden xl:flex flex-col">
        <div className="h-3/5">
          <Drone />
        </div>
        <div className="h-1/2 mt-[50px]">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceContent;
