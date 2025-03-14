import { useState } from "react";
import { CodeEditor } from "./codeEditor/CodeEditor.tsx";
import MainButton from "../../../shared/ui/MainButton.tsx";
import CodeResult from "./codeResult/CodeResult.tsx";
import { useStudentSocket } from "../../../features/student/hooks/useStudentSocket";
import { useRecoilValue } from "recoil";
import { studentSocketState } from "../../../features/student/model/socket";

const Code = () => {
  const [result, setResult] = useState("");
  const { socketState } = useStudentSocket();

  return (
    <>
      <CodeEditor initialValue={socketState.code} />
      <MainButton title={"실행하기"} onClick={() => setResult("hello")} className="my-4" />
      <CodeResult result={result} />
    </>
  );
};

export default Code;
