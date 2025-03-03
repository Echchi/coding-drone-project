import { ILoginParams } from "../../shared/types/instructor.ts";
import { axiosInstance } from "../../shared/libs/axios.ts";
import { ILectureConnectParams } from "../../shared/types/student.ts";

export const studentApi = {
  lectureConnect: async (params: ILectureConnectParams) => {
    const response = await axiosInstance.post("/lecture_connect", params);
    return response.data;
  },
};
