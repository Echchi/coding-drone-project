import { DroneStatus } from "../constants/status";

export interface ILectureConnectParams {
  code: string;
  name: string;
}

export interface IStudent {
  studentId: string;
  name: string;
  code?: string;
  droneStatus?: DroneStatus;
  isConnected: boolean;
}

export interface IStudentList {
  [key: string]: IStudent;
}

export interface IStudentScreenProps {
  studentId: string;
  name: string;
}

export interface IControlUpdate {
  studentId: string;
  type: "code" | "drone";
  value: boolean;
}
