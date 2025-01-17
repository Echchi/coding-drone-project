import React, { useState } from "react";
import DroneControl from "./DroneControl.tsx";
import DroneInfo from "./DroneInfo.tsx";
import DivWithTitle from "../ui/DivWithTitle.tsx";

const Drone = () => {
  const [isOn, setIsOn] = useState(false);
  const [battery, setBattery] = useState(0);
  const [attitude, setAttitude] = useState({ roll: 0, pitch: 0, yaw: 0 });
  const [altitude, setAltitude] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [rangeHeight, setRangeHeight] = useState(0);
  const [flightMode, setFlightMode] = useState('Ready');
  const [controlMode, setControlMode] = useState('Attitude');
  const [movementMode, setMovementMode] = useState('Ready');

  return (
    <DivWithTitle
      title={"드론 정보"}
      titleClassName={"bg-blue-500 ring-blue-500 !left-0"}
      divClassName={"w-full h-full ring-blue-500 p-4"}
    >
      <DroneInfo 
        isOn={isOn}
        battery={battery}
        attitude={attitude}
        altitude={altitude}
        temperature={temperature}
        rangeHeight={rangeHeight}
        flightMode={flightMode}
        controlMode={controlMode}
        movementMode={movementMode}
      />
      <DroneControl 
        isOn={isOn} 
        setIsOn={setIsOn}
        setBattery={setBattery}
        setAttitude={setAttitude}
        setAltitude={setAltitude}
        setTemperature={setTemperature}
        setRangeHeight={setRangeHeight}
        setFlightMode={setFlightMode}
        setControlMode={setControlMode}
        setMovementMode={setMovementMode}
      />
    </DivWithTitle>
  );
};

export default Drone;
