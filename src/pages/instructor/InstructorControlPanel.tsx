import { useState } from "react";
import { cls } from "../../sahred/utils/cls.ts";
import { AnimatePresence, motion } from "framer-motion";

const InstructorControlPanel = () => {
  const [division, setDivision] = useState("4x3");
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [isAllCodeStop, setIsAllCodeStop] = useState(false);
  const [isAllDroneStop, setIsAllDroneStop] = useState(false);
  return (
    <div
      className="w-full h-full bg-amber-50 rounded-lg shadow flex flex-col pt-2 pb-4 px-4 mx-10"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="w-full text-4xl font-dunggeunmiso-b text-center text-lime-600 py-4">
        코딩 드론 플랫폼 <span className="text-xl">(강사)</span>
      </div>
      <div className="h-20 px-4 w-full flex items-center justify-between rounded-lg bg-orange-100 shadow-lg">
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
          <button className="py-3 px-4 font-semibold text-lg bg-stone-100 text-stone-500 rounded-xl shadow-lg">
            <span className="w-3 aspect-square bg-stone-500 inline-block mr-2 rounded-full" />
            연결안됨
          </button>
          <button className="py-3 px-4 font-semibold text-lg bg-amber-100 text-amber-600 rounded-xl shadow-lg">
            <span className="w-3 aspect-square bg-amber-500 inline-block mr-2 rounded-full" />
            질문있어요
          </button>
        </div>

        <div className="relative">
          <button
            className="py-3 px-6 font-semibold text-lg bg-stone-50 text-stone-500 rounded-xl shadow-lg"
            onClick={() => setIsControlOpen(!isControlOpen)}
          >
            전체제어
          </button>

          <AnimatePresence mode="popLayout">
            {isControlOpen && (
              <motion.div
                id={`control_menu`}
                key={`control_menu`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="top-14 right-0 rounded-lg absolute bg-stone-50 w-48 h-fit shadow-lg flex flex-col justify-center items-center space-y-4 p-4">
                  <button className="py-3 w-full font-semibold text-lg bg-blue-500 text-white rounded-xl shadow-lg">
                    코드실행중단
                  </button>
                  <button className="py-3 w-full font-semibold text-lg bg-green-500 text-white rounded-xl shadow-lg">
                    드론제어중단
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex grow mt-3">
        <div
          className={cls(
            "w-full h-full grid *:bg-stone-200 gap-3",
            division === "4x3"
              ? "grid-cols-4 grid-rows-3"
              : division === "4x4"
                ? "grid-cols-4 grid-rows-4"
                : division === "5x4"
                  ? "grid-cols-5 grid-rows-4"
                  : "grid-cols-4 grid-rows-3",
          )}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={`screen_${index}`}
              className="w-full h-full rounded-lg shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorControlPanel;
