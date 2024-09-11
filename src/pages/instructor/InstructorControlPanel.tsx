import { useState } from "react";
import { cls } from "../../sahred/utils/cls.ts";
import { AnimatePresence, motion } from "framer-motion";
import ControlMenu from "./controlMenu/ControlMenu.tsx";
import ScreenGrid from "./screens/ScreenGrid.tsx";

const InstructorControlPanel = () => {
  const [division, setDivision] = useState("4x3");

  return (
    <div
      className="w-full h-full bg-amber-50 rounded-lg shadow flex flex-col pt-2 pb-4 px-4 mx-10 relative"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="w-full text-4xl font-dunggeunmiso-b text-center text-lime-600 py-4">
        코딩 드론 플랫폼 <span className="text-xl">(강사)</span>
      </div>
      <ControlMenu setDivision={setDivision} />
      <div className="flex grow mt-3">
        <ScreenGrid division={division} />
      </div>
    </div>
  );
};

export default InstructorControlPanel;
