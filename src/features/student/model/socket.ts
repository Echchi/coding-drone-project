import { atom } from "recoil";
import { IStudentSocketState } from "../../../shared/types/socket";

export const studentSocketState = atom<IStudentSocketState>({
  key: "studentSocketState",
  default: {
    isConnected: false,
    isCodeEnabled: false,
    isDroneEnabled: false,
  },
});
