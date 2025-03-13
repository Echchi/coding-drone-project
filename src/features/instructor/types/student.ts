export interface IStudent {
  studentId: string;
  name: string;
  code?: string;
  droneStatus?: string;
  isConnected: boolean;
}

export interface IStudentList {
  [key: string]: IStudent;
}

export interface ISocketEvents {
  instructorNotify: {
    event: "studentJoined";
    data: {
      lectureCode: string;
      studentId: string;
      name: string;
      students: IStudent[];
    };
  };
  studentLeft: {
    studentId: string;
    students: IStudent[];
  };
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
