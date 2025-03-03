import { axiosInstance } from "../../shared/libs/axios.ts";

import { ILectureParams } from "../../shared/types/lecture.ts";

export const lectureApi = {
  generateCode: async () => {
    const response = await axiosInstance.get("/lecture/generate_code");
    return response.data;
  },
  createLecture: async (params: ILectureParams) => {
    const response = await axiosInstance.post("/lecture", params);
    return response.data;
  },
  deActiveLecture: async ({ lectureId, active }: ILectureParams) => {
    const response = await axiosInstance.put("/lecture", { lectureId, active });
    return response.data;
  },
  getLectureByCode: async (code: string) => {
    const response = await axiosInstance.get("/lecture", { params: { code } });
    return response.data;
  },
};
