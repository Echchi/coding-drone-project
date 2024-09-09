import React, { SetStateAction, useState } from "react";
import { cls } from "../../../sahred/utils/cls.ts";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

interface IDroneControlProps {
  isOn: boolean;
  setIsOn: React.Dispatch<SetStateAction<boolean>>;
}

const DroneControl = ({ isOn, setIsOn }: IDroneControlProps) => {
  const [roll, setRoll] = useState(50);
  const [pitch, setPitch] = useState(50);

  return (
    <div className="grow flex flex-col relative mt-4">
      <div className="flex relative">
        <div className="w-2/3 flex flex-col">
          <div className="max-w-[12vw] aspect-square p-3 ml-12 relative">
            <img src="/src/assets/icon/drone.png" className="" />
            <AnimatePresence mode="popLayout">
              {!isOn && (
                <motion.div
                  key={`drone_${isOn}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-full bg-neutral-500/50 aspect-square z-10 rounded-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col items-center my-3">
            <span className="w-full text-blue-700 mb-3">
              Roll <span className="font-bold">{roll}</span>
            </span>
            <input
              type={"range"}
              className="w-full bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-500 h-2"
              disabled={!isOn}
              onChange={(event) => setRoll(+event.target.value)}
            />
          </div>
        </div>
        <div className="absolute top-2 right-2 w-2/12 flex flex-col items-center">
          <span className="text-center text-blue-700">
            Pitch <span className="font-bold">{pitch}</span>
          </span>

          <input
            type={"range"}
            className="absolute w-[18vh] top-28 rotate-90 origin-center bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-500 h-2"
            disabled={!isOn}
            value={100 - pitch}
            min={0}
            max={100}
            onChange={(event) => setPitch(100 - +event.target.value)}
          />
        </div>
      </div>

      <button
        className={cls(
          "font-bold rounded-lg py-[0.5vh] text-lg shadow-lg hover:shadow m-[0.5vh] outline-none",
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
