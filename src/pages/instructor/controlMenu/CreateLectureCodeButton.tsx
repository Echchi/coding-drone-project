import { AnimatePresence, motion } from "framer-motion";
import { cls } from "../../../shared/utils/cls.ts";
import MainButton from "../../../shared/ui/MainButton.tsx";
import { MESSAGES } from "../../../shared/constants/messages.ts";
import { useLectureModal } from "../../../features/lecture/hooks/useLectureModal.ts";
import { useGenerateLectureCode } from "../../../features/lecture/hooks/api/useGenerateLectureCode.ts";
import { useLecture } from "../../../shared/context/lectureProvider.tsx";

const CreateLectureCodeButton = () => {
  const {
    error,
    handleClickCreateButton,
    handleCloseModal,
    isCodeModalOpen,
    setIsCodeModalOpen,
    code,
    isCreateLectureLoading,
    isGenerateCodeLoading,
    refetch,
  } = useLectureModal();

  const { hasSavedLecture, savedLecture } = useLecture();
  return (
    <>
      <button
        className={cls(
          "py-3 px-6 font-semibold text-lg rounded-xl shadow-lg disabledBtn bg-amber-500 text-white",
          hasSavedLecture ? "" : "animate-bounce hover:animate-none"
        )}
        onClick={() => setIsCodeModalOpen(true)}
      >
        {hasSavedLecture ? "접속 코드" : "수업 시작"}
      </button>

      <AnimatePresence mode="popLayout">
        {isCodeModalOpen && (
          <>
            <div
              className="!ml-0 fixed inset-0 w-full h-full bg-black/80 rounded-lg flex flex-col justify-center items-center text-white font-bold text-xl z-20"
              onClick={handleCloseModal}
            />
            <motion.div
              key={`create-lecture`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cls(
                "fixed z-30 bg-white shadow py-5 rounded-lg flex items-center justify-center font-bold text-xl min-h-96",
                hasSavedLecture ? "w-[80vh]" : "w-[60vh]"
              )}
              style={{
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
              }}
            >
              {hasSavedLecture ? (
                <>
                  <button onClick={() => setIsCodeModalOpen(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-8 text-stone-600 absolute top-4 right-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                  <div className="text-center my-10 space-y-7">
                    <p
                      className={cls("text-stone-700 flex justify-center", hasSavedLecture ? "text-4xl" : "text-2xl ")}
                    >
                      <span>수업 접속 코드</span>
                    </p>

                    <div className="w-full flex space-x-5">
                      {savedLecture.code?.split("").map((number, index) => (
                        <div
                          key={`code_${index}`}
                          className={cls(
                            "flex justify-center items-center rounded-lg ring-4 ring-lime-500",
                            hasSavedLecture ? "py-10 w-20 text-6xl" : " py-6 w-14 text-2xl"
                          )}
                        >
                          {number}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center my-10 space-y-7">
                  <p className="text-3xl text-stone-700">접속 코드 만들기</p>

                  <div className="w-full flex space-x-5">
                    {code.split("").map((number, index) => (
                      <div
                        key={`code_${index}`}
                        className="flex justify-center items-center py-6 w-14 rounded-lg text-2xl ring-4 ring-lime-500"
                      >
                        {number}
                      </div>
                    ))}

                    <button
                      className="w-fit font-semibold rounded-xl shadow-lg transition-colors py-2 px-3 text-xs bg-lime-500 text-white"
                      disabled={isGenerateCodeLoading}
                      onClick={() => refetch()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </button>
                  </div>
                  <MainButton
                    onClick={() => handleClickCreateButton()}
                    title={"수업 시작"}
                    disabled={isCreateLectureLoading || isGenerateCodeLoading || !!error || !code}
                  />
                  {error && <p className="errorText">{MESSAGES.COMMON_ERROR.UNKNOWN}</p>}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateLectureCodeButton;
