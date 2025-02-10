import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ControlMenu from "./controlMenu/ControlMenu.tsx";
import ScreenGrid from "./screens/ScreenGrid.tsx";
import AlertModal from "../../shared/ui/AlertModal.tsx";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  codeModalState,
  codeState,
  selectedScreenState,
} from "../../shared/state/atom.ts";
import WorkspaceContent from "../student/workspaceContent.tsx";
import CreateLectureCodeButton from "./controlMenu/CreateLectureCodeButton.tsx";

const InstructorControlPanel = () => {
  const [division, setDivision] = useState("4x3");
  const [selectedStudent, setSelectedStudent] =
    useRecoilState(selectedScreenState);
  const recoilSavedCode = useRecoilValue(codeState);

  const sessionSavedCode = sessionStorage.getItem("code") || "";
  const savedCode = sessionSavedCode || recoilSavedCode;

  return (
    <>
      <AnimatePresence>
        {selectedStudent.id > 0 && (
          <AlertModal
            title={selectedStudent.name}
            onClose={() =>
              setSelectedStudent((prev) => ({ ...prev, id: -0, name: "" }))
            }
            content={<WorkspaceContent />}
          />
        )}
      </AnimatePresence>
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
          <CreateLectureCodeButton />
        </div>
      </div>
    </>
  );
};

export default InstructorControlPanel;
