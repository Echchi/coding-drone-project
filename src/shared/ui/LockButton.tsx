import React from "react";
import { cls } from "../utils/cls";

interface LockButtonProps {
  isActive: boolean;
  onClick: () => void;
  type: "code" | "drone";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const LockButton = ({ isActive, onClick, type, className = "", size = "md" }: LockButtonProps) => {
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
      className={cls("font-semibold rounded-xl shadow-lg transition-colors", bgColor, sizeClasses[size], className)}
      onClick={onClick}
    >
      {type === "code" ? "코드" : "드론"} {isActive ? "비활성화" : "활성화"}
    </button>
  );
};

export default LockButton;
