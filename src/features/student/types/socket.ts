export interface IStudentSocketEvents {
  "code:update": { code: string };
  "control:update": { type: "code" | "drone"; value: boolean };
}

export interface IStudentEmitEvents {
  joinLecture: { lectureCode: string };
  "code:update": { code: string };
  "drone:status": { status: string };
}

export interface IStudentSocketState {
  isConnected: boolean;
  isCodeEnabled: boolean;
  isDroneEnabled: boolean;
}
