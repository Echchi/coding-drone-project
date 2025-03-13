export interface ICodeState {
  code: string;
  isDirty: boolean; // 저장되지 않은 변경사항 있는지
  lastSynced: number; // 마지막 동기화 시간
}

export interface ICodeUpdate {
  code: string;
  timestamp: number;
}
