import { atom } from "recoil";

export interface IDroneState {
  isConnected: boolean;
  battery: number;
  attitude: {
    roll: number;
    pitch: number;
    yaw: number;
  };
  altitude: number;
  temperature: number;
  rangeHeight: number;
  flightMode: string;
  controlMode: string;
  movementMode: string;
}

export const droneState = atom<IDroneState>({
  key: "droneState",
  default: {
    isConnected: false,
    battery: 0,
    attitude: { roll: 0, pitch: 0, yaw: 0 },
    altitude: 0,
    temperature: 0,
    rangeHeight: 0,
    flightMode: "Ready",
    controlMode: "Attitude",
    movementMode: "Ready",
  },
});
