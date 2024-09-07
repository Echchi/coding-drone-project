import React, { useState } from "react";
import DroneInfo from "./DroneInfo.tsx";
import DroneControl from "./DroneControl.tsx";

const Drone = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <>
      <DroneInfo isOn={isOn} />
      <DroneControl isOn={isOn} setIsOn={setIsOn} />
    </>
  );
};

export default Drone;
