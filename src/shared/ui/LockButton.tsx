import React from "react";
import { cls } from "../utils/cls";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LockButtonProps {
  isActive: boolean;
  onClick: () => void;
  type: "code" | "drone";
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  label?: string;
}

const LockButton = ({
  isActive,
  onClick,
  type,
  className = "",
  size = "md",
  disabled = false,
  label = "",
}: LockButtonProps) => {
  const bgColor =
    type === "code"
      ? isActive
        ? "bg-blue-500 text-white"
        : "bg-blue-200 text-blue-600"
      : isActive
        ? "bg-green-500 text-white"
        : "bg-green-200 text-green-600";

  const sizeClasses = {
    sm: "py-1 text-xs",
    md: "py-2 text-base",
    lg: "py-3 text-lg",
  };

  return (
    <button
      className={cls(
        "w-full font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[102%]",
        bgColor,
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon
        icon={isActive ? faLock : faUnlock}
        className={cls("transition-transform duration-300", isActive ? "transform rotate-0" : "transform rotate-12")}
      />
      <span>
        {label} {isActive ? "비활성화" : "활성화"}
      </span>
    </button>
  );
};

export default LockButton;
