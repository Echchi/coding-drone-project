import { atom } from "recoil";
import { IStudentSocketState } from "../types/socket";

export const studentSocketState = atom<IStudentSocketState>({
  key: "studentSocketState",
  default: {
    isConnected: false,
    isCodeEnabled: false,
    isDroneEnabled: false,
  },
});
