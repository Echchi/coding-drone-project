import React from "react";
import { cls } from "../../../sahred/utils/cls.ts";
interface IControlButtonsProps {
  codeActive: boolean;
  handleCodeOnClick: () => void;
  droneActive: boolean;
  handleDroneOnClick: () => void;
  isSmall?: boolean;
}
const ControlButtons = ({
  codeActive,
  handleCodeOnClick,
  droneActive,
  handleDroneOnClick,
  isSmall,
}: IControlButtonsProps) => {
  return (
    <>
      <button
        className={cls(
          "w-full font-semibold rounded-xl shadow-lg transition-colors",
          codeActive ? "bg-blue-500 text-white" : "bg-blue-200 text-blue-600",
          isSmall ? "py-1 text-xs" : "py-3 text-lg",
        )}
        onClick={(event) => {
          event.stopPropagation();
          handleCodeOnClick();
        }}
      >
        코드 {codeActive ? "비활성화" : "활성화"}
      </button>
      <button
        className={cls(
          "w-full font-semibold rounded-xl shadow-lg transition-colors",
          droneActive
            ? "bg-green-500 text-white"
            : "bg-green-200 text-green-600",
          isSmall ? "py-1 text-xs" : "py-3 text-lg",
        )}
        onClick={(event) => {
          event.stopPropagation();
          handleDroneOnClick();
        }}
      >
        드론 {droneActive ? "비활성화" : "활성화"}
      </button>
    </>
  );
};

export default ControlButtons;
