import React, { SetStateAction, useState } from "react";
import { cls } from "../../../sahred/utils/cls.ts";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
interface IDroneControlProps {
  isOn: boolean;
  setIsOn: React.Dispatch<SetStateAction<boolean>>;
}
const DroneControl = ({ isOn, setIsOn }: IDroneControlProps) => {
  const [roll, setRoll] = useState("50");
  const [pitch, setPitch] = useState("50");

  return (
    <div className="grow relative">
      <AnimatePresence mode="popLayout">
        {!isOn && (
          <motion.div
            key={`drone_${isOn}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            <div className="absolute bg-neutral-500/50 w-10/12 h-4/5 z-10 rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-10/12 h-4/5">
        <img src="/src/assets/icon/drone.png" className="w-full h-full p-10" />
      </div>

      <span className="absolute right-1 top-1 text-blue-700 flex flex-col items-center">
        Pitch <span className="font-bold">{pitch}</span>
      </span>
      <input
        type={"range"}
        className="absolute right-5 top-64 w-3/5 rotate-90 origin-right bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-500 h-2"
        disabled={!isOn}
        value={pitch}
        onChange={(event) => setPitch(event.target.value)}
      />

      <input
        type={"range"}
        className="absolute right-10 left-10 bottom-8 w-3/5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-500 h-2"
        disabled={!isOn}
        onChange={(event) => setRoll(event.target.value)}
      />

      <span className="text-blue-700">
        Roll <span className="font-bold">{roll}</span>
      </span>
      <button
        className={cls(
          "absolute right-0 bottom-0 font-bold rounded-lg text-sm py-1 shadow-lg hover:shadow",
          isOn
            ? "bg-neutral-300 text-neutral-500 px-2 hover:bg-neutral-200"
            : "bg-lime-500 text-white px-3 hover:bg-lime-400",
        )}
        onClick={() => setIsOn(!isOn)}
      >
        {isOn ? "연결 해제" : "연결"}
      </button>
    </div>
  );
};

export default DroneControl;
