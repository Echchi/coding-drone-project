export interface ILectureConnectParams {
  name: string;
  code: string;
}

export interface IStudent {
  studentId: string;
  name: string;
  code?: string;
  droneStatus?: string;
  isConnected: boolean;
}

export interface IStudentList {
  [key: number]: IStudent;
}
