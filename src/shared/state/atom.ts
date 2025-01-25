import { atom } from "recoil";

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
    id: 0,
    name: "",
  },
});
