export interface ICodeState {
  code: string;
  isDirty: boolean;
  lastSynced: number;
}

export interface ICodeUpdate {
  studentId: string;
  code: string;
}
