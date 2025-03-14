import { useState, useEffect } from "react";

import MainButton from "../../../shared/ui/MainButton.tsx";
import CodeResult from "./codeResult/CodeResult.tsx";
import { useStudentSocket } from "../../../features/student/hooks/useStudentSocket";
import { useRecoilValue } from "recoil";
import { studentSocketState } from "../../../features/student/model/socket";
import CodeEditor from "./codeEditor/CodeEditor.tsx";
import { useCodeExecution } from "../../../features/student/hooks/useCodeExecution";
import { FOOTER_CODE, HEADER_CODE, PLACEHOLDER_CODE } from "../../../features/student/constants/code";

const Code = () => {
  const { socketState } = useStudentSocket();
  const [userCode, setUserCode] = useState(socketState.code || "");
  const { result, isDroneConnected, setIsDroneConnected, executePythonCode } = useCodeExecution();

  // 소켓으로부터 받은 코드로 상태 업데이트
  useEffect(() => {
    if (socketState.code) {
      setUserCode(socketState.code);
    }
  }, [socketState.code]);

  useEffect(() => {
    // 드론 연결 상태 이벤트 리스너
    const handleDroneConnection = (event: CustomEvent) => {
      setIsDroneConnected(event.detail.connected);
    };

    window.addEventListener("drone-connection", handleDroneConnection as EventListener);

    return () => {
      window.removeEventListener("drone-connection", handleDroneConnection as EventListener);
    };
  }, [setIsDroneConnected]);

  // 전체 코드 조합
  const getFullCode = () => {
    return `${HEADER_CODE}\n${userCode}\n${FOOTER_CODE}`;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <CodeEditor codeInput={userCode} setCodeInput={setUserCode} />

      <MainButton
        title="실행하기"
        onClick={() => executePythonCode(userCode)}
        className="w-full bg-[#E5A243] hover:bg-[#d89636] text-white font-bold py-4 rounded-2xl text-xl my-6"
      />

      <CodeResult result={result} />
    </div>
  );
};

export default Code;
