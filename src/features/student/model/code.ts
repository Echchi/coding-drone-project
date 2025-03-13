import { atom } from "recoil";
import { ICodeState } from "../types/code";

export const codeState = atom<ICodeState>({
  key: "studentCodeState",
  default: {
    code: "",
    isDirty: false,
    lastSynced: Date.now(),
  },
});
