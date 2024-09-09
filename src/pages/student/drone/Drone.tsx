import React, { useState } from "react";
import DroneInfo from "./DroneInfo.tsx";
import DroneControl from "./DroneControl.tsx";
import DivWithTitle from "../ui/DivWithTitle.tsx";

const Drone = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <DivWithTitle
      title={"드론 정보"}
      titleClassName={"bg-blue-500 ring-blue-500 !left-0"}
      divClassName={"w-full h-full ring-blue-500 p-4"}
    >
      <DroneInfo isOn={isOn} />
      <DroneControl isOn={isOn} setIsOn={setIsOn} />
    </DivWithTitle>
  );
};

export default Drone;
