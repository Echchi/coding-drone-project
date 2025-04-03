import { atom } from "recoil";
import { ICodeState } from "../../../shared/types/code";

export const codeState = atom<ICodeState>({
  key: "studentCodeState",
  default: {
    code: "",
    isDirty: false,
    lastSynced: Date.now(),
  },
});
