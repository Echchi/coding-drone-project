import { atom } from "recoil";
import { IStudentList } from "../types/student";
import { Socket } from "socket.io-client";

export const allStudentsCodeActiveState = atom({
  key: "allCodeActiveState",
  default: true,
});
export const allStudentsDroneActiveState = atom({
  key: "allDroneActiveState",
  default: true,
});
export const selectedScreenState = atom({
  key: "selectedScreenState",
  default: {
    id: "",
    name: "",
  },
});

export const codeModalState = atom({
  key: "codeModalState",
  default: false,
});

export const studentListState = atom<IStudentList>({
  key: "studentListState",
  default: {},
});
