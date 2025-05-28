export interface ILectureParams {
  instructorId?: string;
  code: string;
  lectureId?: number;
  active?: boolean;
}

export interface ILectureDeactivateParams {
  lectureId: number;
  active: boolean;
}

export interface ILectureResponse {
  id: number;
  code: string;
  active: boolean;
  instructorId: number;
  instructorRoom: string;
  created_at: string;
  updated_at: string;
}
