export interface ICodeState {
  code: string;
  isDirty: boolean;
  lastSynced: number;
}

export interface ICodeUpdate {
  studentId: string;
  code: string;
}

export interface ICodeExecutionResult {
  success: boolean;
  error?: string;
}

export interface IDroneCommand {
  type: "takeoff" | "land" | "emergency";
}

export interface ICodeExecutionRequest {
  code: string;
  studentId: string;
  lectureCode: string;
}
