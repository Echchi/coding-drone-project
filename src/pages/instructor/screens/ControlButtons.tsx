import React from "react";
import { cls } from "../../../shared/utils/cls.ts";
import LockButton from "../../../shared/ui/LockButton.tsx";
interface IControlButtonsProps {
  codeActive: boolean;
  handleCodeOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  droneActive: boolean;
  handleDroneOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
        onClick={(event) => handleCodeOnClick(event)}
        type="code"
        size={size}
        disabled={disabled}
        label="코드"
      />
      <LockButton
        isActive={droneActive}
        onClick={(event) => handleDroneOnClick(event)}
        type="drone"
        size={size}
        disabled={disabled}
        label="드론"
      />
    </>
  );
};

export default ControlButtons;
