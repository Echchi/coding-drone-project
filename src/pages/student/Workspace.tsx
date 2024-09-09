import Code from "./code/Code.tsx";
import Drone from "./drone/Drone.tsx";
import DivWithTitle from "./ui/DivWithTitle.tsx";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Chat from "./chat/chat.tsx";

const Workspace = () => {
  return (
    <div
      className="w-full h-full bg-amber-50 rounded-lg shadow flex flex-col pt-3 pb-8 px-8 mx-20"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <p className="w-full text-4xl font-dunggeunmiso-b text-center text-lime-600 py-2">
        코딩 드론 플랫폼
      </p>
      <div className="w-full h-full grid grid-cols-4 gap-x-4">
        <div className="col-span-3 flex flex-col">
          <Code />
        </div>
        <div className="w-full h-full hidden xl:flex flex-col">
          <div className="h-1/2">
            <Drone />
          </div>
          <div className="h-1/2 mt-[50px]">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
