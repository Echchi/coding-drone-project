import React, { useEffect } from "react";
import DroneControl from "./DroneControl.tsx";
import DroneInfo from "./DroneInfo.tsx";
import DivWithTitle from "../ui/DivWithTitle.tsx";
import { useDroneControl } from "../../../features/student/hooks/useDroneControl.ts";

const Drone = ({ isDroneEnabled }: { isDroneEnabled: boolean }) => {
  const { drone, updateDroneState } = useDroneControl();

  // 드론 상태 변경 시 서버로 전송하기 위한 간소화된 setter 함수들
  const setIsOn = (value: boolean) => updateDroneState({ isConnected: value });
  const setBattery = (value: number) => updateDroneState({ battery: value });
  const setAttitude = (value: { roll: number; pitch: number; yaw: number }) => updateDroneState({ attitude: value });
  const setAltitude = (value: number) => updateDroneState({ altitude: value });
  const setTemperature = (value: number) => updateDroneState({ temperature: value });
  const setRangeHeight = (value: number) => updateDroneState({ rangeHeight: value });
  const setFlightMode = (value: string) => updateDroneState({ flightMode: value });
  const setControlMode = (value: string) => updateDroneState({ controlMode: value });
  const setMovementMode = (value: string) => updateDroneState({ movementMode: value });

  return (
    <DivWithTitle
      title={"드론 정보"}
      titleClassName={"bg-blue-500 ring-blue-500 !left-0"}
      divClassName={"w-full h-full ring-blue-500"}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <DroneInfo
            isOn={drone.isConnected}
            battery={drone.battery}
            attitude={drone.attitude}
            altitude={drone.altitude}
            temperature={drone.temperature}
            rangeHeight={drone.rangeHeight}
            flightMode={drone.flightMode}
            controlMode={drone.controlMode}
            movementMode={drone.movementMode}
          />
        </div>
        <div className="flex-shrink-0">
          <DroneControl
            isOn={drone.isConnected}
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
        </div>
      </div>
    </DivWithTitle>
  );
};

export default Drone;
