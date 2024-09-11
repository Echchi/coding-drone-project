import React, { useEffect, useState } from "react";
import { cls } from "../../../sahred/utils/cls.ts";
import ControlButtons from "./ControlButtons.tsx";
import { useRecoilValue } from "recoil";
import {
  allStudentsCodeActiveState,
  allStudentsDroneActiveState,
} from "../../../features/control/atom.ts";
import Modal from "../../../sahred/ui/Modal.tsx";
import Workspace from "../../student/Workspace.tsx";

const Screen = ({ index }: { index: number }) => {
  const allStudentsCodeActive = useRecoilValue(allStudentsCodeActiveState);
  const allStudentsDroneActive = useRecoilValue(allStudentsDroneActiveState);
  const [codeActive, setCodeActive] = useState(true);
  const [droneActive, setDroneActive] = useState(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  useEffect(() => {
    setCodeActive(allStudentsCodeActive);
  }, [allStudentsCodeActive]);
  useEffect(() => {
    setDroneActive(allStudentsDroneActive);
  }, [allStudentsDroneActive]);
  const handleClickScreen = () => {
    setIsWorkspaceOpen(true);
  };
  return (
    <>
      {isWorkspaceOpen && (
        <Modal onClose={() => setIsWorkspaceOpen} content={"우잉"} />
      )}
      <div
        key={`screen_${index}`}
        className={cls(
          "w-full h-full rounded-lg shadow-lg flex flex-col transition-all cursor-pointer hover:scale-105 hover:shadow-xl",
          !codeActive && !droneActive ? "ring ring-cyan-500" : "",
          codeActive ? "" : "ring ring-blue-500",
          droneActive ? "" : "ring ring-green-500",
        )}
        onClick={handleClickScreen}
      >
        <div className="w-full h-9 rounded-t-lg flex justify-between items-center px-3 bg-gray-100">
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
        <div className="grow bg-white relative rounded-b-lg text-xs font-JetBrains p-2">
          console.log("hello");
          {index === 3 && (
            <div className="absolute inset-0 w-full h-full bg-amber-200/70 rounded-b-lg flex flex-col justify-center items-center text-amber-600 font-bold text-xl animate-pulse">
              <p className="flex items-center">
                <picture>
                  <source
                    srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.webp"
                    type="image/webp"
                  />
                  <img
                    src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif"
                    alt="👋"
                    className="size-6 mr-2"
                  />
                </picture>
                질문있어요
              </p>
            </div>
          )}
          {index === 9 && (
            <div className="absolute inset-0 w-full h-full bg-stone-500 rounded-b-lg flex flex-col justify-center items-center text-white font-bold text-xl">
              <p>연결되지않음</p>
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
    </>
  );
};

export default Screen;
