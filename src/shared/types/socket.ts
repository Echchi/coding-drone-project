// Socket Event Data Types
export interface CodeUpdateData {
  code: string;
}

export interface ControlUpdateData {
  type: "code" | "drone";
  value: boolean;
}

export interface JoinLectureData {
  lectureCode: string;
  studentId: string;
  name: string;
}

export interface JoinResponseData {
  code?: string;
  codeActive?: boolean;
  droneActive?: boolean;
  success: boolean;
  message?: string;
}

export interface CodeSubmitData {
  lectureCode: string;
  studentId: string;
  code: string;
}

export interface DroneStatusData {
  status: string;
  lectureCode: string;
  studentId: string;
}

export interface CodeActiveChangedData {
  active: boolean;
}

export interface DroneActiveChangedData {
  active: boolean;
}

export interface CodeUpdatedByInstructorData {
  code: string;
  instructorId: string;
}

// Socket Event Interfaces
export interface IStudentSocketEvents {
  "code:update": CodeUpdateData;
  "control:update": ControlUpdateData;
  "joinResponse": JoinResponseData;
  "code:activeChanged": CodeActiveChangedData;
  "drone:activeChanged": DroneActiveChangedData;
  "code:updatedByInstructor": CodeUpdatedByInstructorData;
  "connect": void;
  "disconnect": string;
  "connect_error": Error;
}

export interface IStudentEmitEvents {
  "joinLecture": JoinLectureData;
  "code:update": CodeUpdateData;
  "code:submit": CodeSubmitData;
  "drone:status": DroneStatusData;
  "drone:update": DroneStatusData;
}

export interface IStudentSocketState {
  isConnected: boolean;
  isCodeEnabled: boolean;
  isDroneEnabled: boolean;
  code?: string;
  droneStatus?: string;
}

export interface ISocketEvents {
  studentJoined: {
    studentId: string;
    name: string;
  };
  studentLeft: {
    studentId: string;
  };
  "code:updated": {
    studentId: string;
    code: string;
  };
  "drone:updated": {
    studentId: string;
    status: string;
  };
}

// Utility Types
export interface DebouncedFunction<T extends (...args: unknown[]) => void> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

// Socket Error Types
export interface SocketError extends Error {
  code?: string;
  type?: 'connection' | 'timeout' | 'authentication' | 'unknown';
}
