import React from "react";
import { cls } from "../../sahred/utils/cls.ts";

const InstructorControlPanel = () => {
  return (
    <div
      className="w-full h-full bg-amber-50 rounded-lg shadow flex flex-col pt-2 pb-4 px-4 mx-10"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <p className="w-full text-4xl font-dunggeunmiso-b text-center text-lime-600 py-2">
        코딩 드론 플랫폼 <span className="text-xl">(강사)</span>
      </p>
      <div className="flex grow">
        <div
          className={cls("w-10/12 h-full grid grid-cols-4 bg-neutral-200")}
        ></div>
        <div className="grow bg-red-500"></div>
      </div>
    </div>
  );
};

export default InstructorControlPanel;
