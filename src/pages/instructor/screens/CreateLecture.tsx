import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cls } from "../../../shared/utils/cls.ts";
import { useGenerateCodeApi } from "../../../features/lecture/hooks/useGenerateCodeApi.ts";

const CreateLecture = () => {
  const { data, isLoading, refetch } = useGenerateCodeApi();
  const [isOpen, setIsOpen] = useState(true);
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(data.code);
    console.log("data", data);
  }, [data]);

  return (
    <div>
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            key={`create-lecture`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cls(
              "fixed z-30 bg-white shadow py-5 rounded-lg flex items-center justify-center w-[60vh] font-bold text-xl",
            )}
            style={{
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
            }}
          >
            <div className="text-center my-10">
              <p className="text-2xl text-stone-700">강의 개설</p>
              <div className="my-4">
                <div className="w-full space-x-5">
                  {code.length > 0 &&
                    code.split("").map((number, index) => (
                      <div
                        className="h-20 mx-auto w-10 bg-stone-200"
                        key={`code_${index}`}
                      >
                        {number}{" "}
                      </div>
                    ))}
                </div>
                {/*<p className="text-stone-600">*/}
                {/*  아래 강의 코드를 학생들에게 알려주세요*/}
                {/*</p>*/}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateLecture;
