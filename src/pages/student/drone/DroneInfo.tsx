import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull } from "@fortawesome/free-solid-svg-icons";
import { cls } from "../../../sahred/utils/cls.ts";

const DroneInfo = ({ isOn }: { isOn: boolean }) => {
  return (
    <div className="w-full text-lg flex items-center justify-between *:text-blue-700">
      <div
        className={cls(
          "w-5 aspect-square rounded-full",
          isOn ? "bg-green-500" : "bg-neutral-500",
        )}
      />
      <div className="flex w-full px-2">
        <div className="font-bold">Co Drone Mini</div>
      </div>
      <p className="flex items-center space-x-1">
        <span className="font-semibold">99%</span>
        <span className="*:size-8 flex items-center">
          <FontAwesomeIcon icon={faBatteryFull} />
        </span>
      </p>
    </div>
  );
};

export default DroneInfo;
