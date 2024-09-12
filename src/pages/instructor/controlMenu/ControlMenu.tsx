import { SetStateAction, useState } from "react";
import MasterControlButton from "./MasterControlButton.tsx";
interface IMenu {
  setDivision: React.Dispatch<SetStateAction<string>>;
}
const ControlMenu = ({ setDivision }: IMenu) => {
  return (
    <div className="h-16 px-4 w-full flex items-center justify-between">
      <div className="h-full flex items-center space-x-4">
        <select
          className="rounded-lg py-3 shadow px-5 text-lg font-semibold outline-none"
          onChange={(event) => setDivision(event.target.value)}
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

        <button className="py-3 px-4 font-semibold text-lg bg-white rounded-xl shadow-lg">
          전체
        </button>
        <button className="py-3 px-4 font-semibold text-lg bg-rose-100 text-rose-600 rounded-xl shadow-lg">
          <span className="w-3 aspect-square bg-red-500 inline-block mr-2 rounded-full" />
          이상있음
        </button>

      </div>

      <MasterControlButton />
    </div>
  );
};

export default ControlMenu;
