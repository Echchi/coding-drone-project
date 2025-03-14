import { useState, useEffect } from "react";
import { CodeEditor } from "./codeEditor/CodeEditor.tsx";
import MainButton from "../../../shared/ui/MainButton.tsx";
import CodeResult from "./codeResult/CodeResult.tsx";
import { useStudentSocket } from "../../../features/student/hooks/useStudentSocket";
import { useRecoilValue } from "recoil";
import { studentSocketState } from "../../../features/student/model/socket";

const HEADER_CODE = `from e_drone.drone import *
from e_drone.protocol import *

drone = CoDrone()
drone.pair()
`;

const FOOTER_CODE = `
drone.close()`;

const PLACEHOLDER_CODE = `# 여기에 코드를 입력하세요
# 예시:
# drone.sendTakeOff()
# drone.sendLanding()`;

const Code = () => {
  const [result, setResult] = useState("");
  const { socketState } = useStudentSocket();
  const [userCode, setUserCode] = useState(socketState.code || "");
  const [isDroneConnected, setIsDroneConnected] = useState(false);

  useEffect(() => {
    // 드론 연결 상태 이벤트 리스너
    const handleDroneConnection = (event: CustomEvent) => {
      setIsDroneConnected(event.detail.connected);
    };

    window.addEventListener('drone-connection', handleDroneConnection as EventListener);

    return () => {
      window.removeEventListener('drone-connection', handleDroneConnection as EventListener);
    };
  }, []);

  // 전체 코드 조합
  const getFullCode = () => {
    return `${HEADER_CODE}\n${userCode}\n${FOOTER_CODE}`;
  };

  const executePythonCode = async () => {
    if (!isDroneConnected) {
      setResult("드론이 연결되어 있지 않습니다. 먼저 드론을 연결해주세요.");
      return;
    }

    try {
      const commands = getFullCode().match(/drone\.(send\w+|go|move|hover|turn|flip)\([^)]*\)|sleep\([\d.]+\)/g) || [];

      for (const cmd of commands) {
        if (cmd.includes('sleep')) {
          const seconds = parseFloat(cmd.match(/sleep\(([\d.]+)\)/)?.[1] || "0");
          await new Promise(resolve => setTimeout(resolve, seconds * 1000));
          continue;
        }

        const droneCommand = (() => {
          if (cmd.includes('sendTakeOff')) return { type: 'takeoff' };
          if (cmd.includes('sendLanding')) return { type: 'land' };
          if (cmd.includes('emergencyStop')) return { type: 'emergency' };
          return null;
        })();

        if (droneCommand) {
          const event = new CustomEvent('drone-command', { detail: { command: droneCommand.type } });
          window.dispatchEvent(event);
          await new Promise(resolve => setTimeout(resolve, droneCommand.type === 'takeoff' ? 4000 : 2000));
        }
      }

      setResult("코드 실행 완료");
    } catch (error: unknown) {
      setResult(error instanceof Error ? `오류 발생: ${error.message}` : "알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200 p-6">
        <pre className="text-black mb-4">{HEADER_CODE}</pre>
        <CodeEditor codeInput={userCode} setCodeInput={setUserCode} placeholder={PLACEHOLDER_CODE} />
        <pre className="text-black mt-4">{FOOTER_CODE}</pre>
      </div>

      <MainButton
        title="실행하기"
        onClick={executePythonCode}
        className="w-full bg-[#E5A243] hover:bg-[#d89636] text-white font-bold py-4 rounded-2xl text-xl mt-6"
      />

      <CodeResult result={result} className="mt-4" />
    </div>
  );
};

export default Code;
