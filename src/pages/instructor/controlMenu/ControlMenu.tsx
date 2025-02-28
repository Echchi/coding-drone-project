import { SetStateAction, useState } from "react";

import { cls } from "../../../shared/utils/cls.ts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CreateLectureCodeButton from "./CreateLectureCodeButton.tsx";
import AllControlButtons from "./AllControlButtons.tsx";
import CloseLectureButton from "./CloseLectureButton.tsx";
import LogoutButton from "./LogoutButton.tsx";
import { useLecture } from "../../../shared/context/lectureProvider.tsx";
interface IMenu {
  setDivision: React.Dispatch<SetStateAction<string>>;
}
const ControlMenu = ({ setDivision }: IMenu) => {
  const { hasSavedLecture } = useLecture();

  return (
    <div className="h-16 px-4 w-full flex items-center justify-between">
      <div className="h-full flex items-center space-x-4">
        <select
          className="rounded-lg py-3 shadow px-5 text-lg font-semibold outline-none"
          onChange={(event) => setDivision(event.target.value)}
          disabled={!hasSavedLecture}
        >
          <option className="flex items-center" value={"4x3"}>
            4 x 3
          </option>
          <option className="flex items-center" value={"4x4"}>
            4 x 4
          </option>
          <option className="flex items-center" value={"5x4"}>
            5 x 4
          </option>
        </select>

        <button
          className="py-3 px-4 font-semibold text-lg bg-white rounded-xl shadow-lg disabledBtn"
          disabled={!hasSavedLecture}
        >
          전체
        </button>
        <button
          className="py-3 px-4 font-semibold text-lg bg-rose-100 text-rose-600 rounded-xl shadow-lg disabledBtn"
          disabled={!hasSavedLecture}
        >
          <span
            className={cls(
              "w-3 aspect-square inline-block mr-2 rounded-full",
              hasSavedLecture ? "bg-red-500 " : "bg-stone-500",
            )}
          />
          이상있음
        </button>
      </div>
      <div className="relative flex space-x-4">
        <CreateLectureCodeButton />
        {hasSavedLecture && (
          <>
            <AllControlButtons />
            <CloseLectureButton />
          </>
        )}
        <LogoutButton />
      </div>
    </div>
  );
};

export default ControlMenu;
