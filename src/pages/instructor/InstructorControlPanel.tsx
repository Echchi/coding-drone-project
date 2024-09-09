import { useState } from "react";
import { cls } from "../../sahred/utils/cls.ts";
import { AnimatePresence, motion } from "framer-motion";

const InstructorControlPanel = () => {
  const [division, setDivision] = useState("4x3");
  const [isControlOpen, setIsControlOpen] = useState(false);
  return (
    <div
      className="w-full h-full bg-amber-50 rounded-lg shadow flex flex-col pt-2 pb-4 px-4 mx-10"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="w-full text-4xl font-dunggeunmiso-b text-center text-lime-600 py-4">
        코딩 드론 플랫폼 <span className="text-xl">(강사)</span>
      </div>
      <div className="h-14 w-full flex items-center justify-between">
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

          <button className="py-3 px-4 font-semibold text-lg bg-lime-500 text-white rounded-xl shadow-lg">
            전체
          </button>
          <button className="py-3 px-4 font-semibold text-lg bg-red-500 text-white rounded-xl shadow-lg">
            이상있음
          </button>
          <button className="py-3 px-4 font-semibold text-lg bg-neutral-500 text-white rounded-xl shadow-lg">
            연결안됨
          </button>
          <button className="py-3 px-4 font-semibold text-lg bg-orange-500 text-white rounded-xl shadow-lg">
            질문있어요
          </button>
        </div>
        <div className="relative">
          <button
            className="py-3 px-6 font-semibold text-lg bg-neutral-50 text-neutral-500 rounded-xl shadow-lg"
            onClick={() => setIsControlOpen(!isControlOpen)}
          >
            일괄제어
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
                <div className="top-14 right-0 rounded-lg absolute bg-neutral-50 w-72 h-[70vh] shadow-lg">
                  <div className="h-4/5 overflow-y-auto">
                    {Array.from({ length: 12 }, (_, index) => (
                      <p
                        className="w-full flex items-center h-16 px-5 cursor-pointer"
                        key={`control_list_${index + 1}`}
                      >
                        <input
                          type="checkbox"
                          className="outline-none accent-lime-600 size-5"
                        />
                        <span className="text-xl text-center pl-10">
                          학생 {index}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex grow mt-3">
        <div
          className={cls(
            "w-full h-full grid *:bg-neutral-200 gap-3",
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
