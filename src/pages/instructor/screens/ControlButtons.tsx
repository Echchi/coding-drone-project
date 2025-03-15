import React from "react";
import { cls } from "../../../shared/utils/cls.ts";
import LockButton from "../../../shared/ui/LockButton.tsx";
interface IControlButtonsProps {
  codeActive: boolean;
  handleCodeOnClick: () => void;
  droneActive: boolean;
  handleDroneOnClick: () => void;
  size: "sm" | "md" | "lg";
  disabled?: boolean;
}
const ControlButtons = ({
  codeActive,
  handleCodeOnClick,
  droneActive,
  handleDroneOnClick,
  size,
  disabled,
}: IControlButtonsProps) => {
  return (
    <>
      <LockButton
        isActive={codeActive}
        onClick={handleCodeOnClick}
        type="code"
        size={size}
        disabled={disabled}
        label="코드"
      />
      <LockButton
        isActive={droneActive}
        onClick={handleDroneOnClick}
        type="drone"
        size={size}
        disabled={disabled}
        label="드론"
      />
    </>
  );
};

export default ControlButtons;
