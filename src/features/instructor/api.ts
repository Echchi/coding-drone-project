import { ILoginParams } from "../../shared/types/instructor.ts";
import { axiosInstance } from "../../shared/libs/axios.ts";

export const instructorApi = {
  login: async (params: ILoginParams) => {
    const response = await axiosInstance.post("/login", params);
    return response.data;
  },
};
