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
  const { result, isDroneConnected, setIsDroneConnected, executePythonCode, isCodeEnabled, isDroneEnabled } =
    useCodeExecution();

  // 소켓으로부터 받은 코드로 상태 업데이트
  useEffect(() => {
    console.log("소켓에서 코드 변경 감지:", socketState.code ? socketState.code.substring(0, 30) + "..." : "코드 없음");
    if (socketState.code !== undefined) {
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

  // 상태 표시 메시지
  const getStatusMessage = () => {
    if (!socketState.isConnected) return "서버에 연결되어 있지 않습니다. 페이지를 새로고침해 주세요.";
    if (!isCodeEnabled && !isDroneEnabled) return "선생님에 의해 코드 실행과 드론 조작이 비활성화되었습니다.";
    if (!isCodeEnabled) return "선생님에 의해 코드 실행이 비활성화되었습니다.";
    if (!isDroneEnabled) return "선생님에 의해 드론 조작이 비활성화되었습니다.";
    if (!isDroneConnected) return "드론이 연결되어 있지 않습니다.";
    return null;
  };

  const statusMessage = getStatusMessage();

  // 코드 실행 핸들러
  const handleExecuteCode = () => {
    if (!isCodeEnabled) return;
    executePythonCode(userCode);
  };

  return (
    <div className={`w-full h-full flex flex-col ${!isCodeEnabled ? "relative" : ""}`}>
      {statusMessage && (
        <div className="bg-rose-100 border-l-4 border-rose-500 text-rose-700 font-semibold p-4 mb-4 rounded">
          <p>{statusMessage}</p>
        </div>
      )}

      <CodeEditor className="flex-1" />

      <MainButton
        title={"실행하기"}
        onClick={handleExecuteCode}
        className={`w-full ${isCodeEnabled ? "bg-[#E5A243] hover:bg-[#d89636]" : "bg-gray-400 cursor-not-allowed"} text-white font-bold py-4 rounded-2xl text-xl my-6`}
        disabled={!isCodeEnabled}
      />

      <CodeResult result={result} />
    </div>
  );
};

export default Code;
