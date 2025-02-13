import { axiosInstance } from "../../shared/libs/axios.ts";

import { ICreateLectureParams } from "../../shared/types/lecture.ts";

export const lectureApi = {
  generateCode: async () => {
    const response = await axiosInstance.get("/lecture/generate_code");
    return response.data;
  },
  createLecture: async (params: ICreateLectureParams) => {
    const response = await axiosInstance.post("/lecture", params);
    return response.data;
  },
  deActiveLecture: async (lectureId: number) => {
    const response = await axiosInstance.put("/lecture", lectureId);
    return response.data;
  },
};
