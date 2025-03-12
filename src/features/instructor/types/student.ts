export interface IStudent {
  studentId: string;
  name: string;
  code: string;
  droneStatus: string;
  isConnected: boolean;
}

export interface IStudentList {
  [key: number]: IStudent;
}

export interface ISocketEvents {
  "student:join": { index: number; student: IStudent };
  "student:leave": { index: number };
  "student:code:update": { index: number; code: string };
  "student:drone:status": { index: number; status: string };
}

export interface ICodeUpdate {
  studentId: string;
  code: string;
  index: number;
}

export interface IControlUpdate {
  studentId: string;
  index: number;
  type: "code" | "drone";
  value: boolean;
}
