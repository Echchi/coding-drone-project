import { atom } from "recoil";
import { IStudent } from "../types/student";

export const studentListState = atom<Record<string, IStudent>>({
  key: "studentListState",
  default: {},
});
