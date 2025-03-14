import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull } from "@fortawesome/free-solid-svg-icons";
import { cls } from "../../../shared/utils/cls.ts";

interface DroneInfoProps {
  isOn: boolean;
  battery?: number;
  attitude?: {
    roll: number;
    pitch: number;
    yaw: number;
  };
  altitude?: number;
  temperature?: number;
  rangeHeight?: number;
  flightMode?: string;
  controlMode?: string;
  movementMode?: string;
}

// memo를 사용하여 불필요한 리렌더링 방지
const DroneInfo = memo(({
  isOn,
  battery = 0,
  attitude = { roll: 0, pitch: 0, yaw: 0 },
  altitude = 0,
  temperature = 0,
  rangeHeight = 0,
  flightMode = 'Ready',
  controlMode = 'Attitude',
  movementMode = 'Ready'
}: DroneInfoProps) => {
  console.log('DroneInfo render:', { battery, attitude, altitude, temperature, rangeHeight }); // 디버깅용 로그

  return (
    <div className="w-full p-4 space-y-2">
      {/* 상단: 연결 상태와 배터리 */}
      <div className="text-lg flex items-center justify-between *:text-blue-700">
        <div
          className={cls(
            "w-5 aspect-square rounded-full",
            isOn ? "bg-lime-500" : "bg-neutral-500",
          )}
        />
        <div className="flex w-full px-2">
          <div className="font-bold">Co Drone Mini</div>
        </div>
        <p className="flex items-center space-x-1">
          <span className="font-semibold">{battery}%</span>
          <span className="*:size-8 flex items-center">
            <FontAwesomeIcon icon={faBatteryFull} />
          </span>
        </p>
      </div>

      {/* 중간: 모드 정보 */}
      <div className="text-sm grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded-lg">
        <div className="flex flex-col items-center">
          <span className="text-gray-600">비행 모드</span>
          <span className="font-semibold">{flightMode}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-600">제어 모드</span>
          <span className="font-semibold">{controlMode}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-600">동작 모드</span>
          <span className="font-semibold">{movementMode}</span>
        </div>
      </div>

      {/* 하단: 자세 및 센서 정보 */}
      <div className="text-sm grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded-lg">
        <div className="flex flex-col items-center">
          <span className="text-gray-600">Roll</span>
          <span className="font-semibold">
            {attitude?.roll?.toFixed(1) ?? '0.0'}°
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-600">Pitch</span>
          <span className="font-semibold">
            {attitude?.pitch?.toFixed(1) ?? '0.0'}°
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-600">Yaw</span>
          <span className="font-semibold">
            {attitude?.yaw?.toFixed(1) ?? '0.0'}°
          </span>
        </div>
      </div>

      {/* 추가: 고도 및 센서 정보 */}
      <div className="text-sm grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded-lg">
        <div className="flex flex-col items-center">
          <span className="text-gray-600">고도</span>
          <span className="font-semibold">
            {altitude?.toFixed(1) ?? '0.0'} cm
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-600">해발 고도</span>
          <span className="font-semibold">
            {rangeHeight?.toFixed(1) ?? '0.0'} cm
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-600">온도</span>
          <span className="font-semibold">
            {temperature?.toFixed(1) ?? '0.0'} °C
          </span>
        </div>
      </div>
    </div>
  );
});

DroneInfo.displayName = 'DroneInfo';

export default DroneInfo;
