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

// Drone Command Types
export type DroneCommandType = "takeoff" | "land" | "emergency" | "move" | "turn";
export type DroneDirection = "forward" | "backward";
export type TurnDirection = "right" | "left";

export interface BaseDroneCommand {
  type: DroneCommandType;
}

export interface TakeoffCommand extends BaseDroneCommand {
  type: "takeoff";
}

export interface LandCommand extends BaseDroneCommand {
  type: "land";
}

export interface EmergencyCommand extends BaseDroneCommand {
  type: "emergency";
}

export interface MoveCommand extends BaseDroneCommand {
  type: "move";
  direction: DroneDirection;
  distance: string;
}

export interface TurnCommand extends BaseDroneCommand {
  type: "turn";
  direction: TurnDirection;
  angle: string;
}

export type IDroneCommand = TakeoffCommand | LandCommand | EmergencyCommand | MoveCommand | TurnCommand;

// Code Execution Types
export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime?: number;
}

export interface DroneCommandEvent {
  command: DroneCommandType;
  parameters?: Record<string, string | number>;
}

// Python Code Types
export interface PythonCodeBlock {
  code: string;
  lineNumber: number;
  type: 'command' | 'sleep' | 'comment' | 'other';
}

export interface CodeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Drone Status Types
export type DroneConnectionStatus = "connected" | "disconnected" | "connecting" | "error";

export interface DroneStatus {
  isConnected: boolean;
  status: DroneConnectionStatus;
  lastCommand?: IDroneCommand;
  lastCommandTime?: number;
  error?: string;
}

export interface ICodeExecutionRequest {
  code: string;
  studentId: string;
  lectureCode: string;
}
