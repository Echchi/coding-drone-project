import { useState, useEffect } from "react";
import CodeEditor from "./codeEditor/CodeEditor.tsx";
import MainButton from "../../../sahred/ui/MainButton.tsx";
import CodeResult from "./codeResult/CodeResult.tsx";
import DivWithTitle from "../ui/DivWithTitle.tsx";

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
  const [userCode, setUserCode] = useState('');
  const [result, setResult] = useState("");
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
      // 전체 코드에서 드론 명령어와 sleep 함수 추출
      const commands = getFullCode().match(/drone\.(send\w+|go|move|hover|turn|flip)\([^)]*\)|sleep\([\d.]+\)/g) || [];

      // DroneControl 컴포넌트의 명령어로 변환
      for (const cmd of commands) {
        if (cmd.includes('sleep')) {
          // sleep 함수 처리
          const seconds = parseFloat(cmd.match(/sleep\(([\d.]+)\)/)?.[1] || "0");
          await new Promise(resolve => setTimeout(resolve, seconds * 1000));
          continue;
        }

        // 드론 명령어 처리
        const droneCommand = (() => {
          if (cmd.includes('sendTakeOff')) {
            return { type: 'takeoff' };
          } else if (cmd.includes('sendLanding')) {
            return { type: 'land' };
          } else if (cmd.includes('emergencyStop')) {
            return { type: 'emergency' };
          }
          return null;
        })();

        if (droneCommand) {
          switch (droneCommand.type) {
            case 'takeoff':
              const takeoffEvent = new CustomEvent('drone-command', {
                detail: { command: 'takeoff' }
              });
              window.dispatchEvent(takeoffEvent);
              await new Promise(resolve => setTimeout(resolve, 4000));
              break;
            case 'land':
              const landEvent = new CustomEvent('drone-command', {
                detail: { command: 'land' }
              });
              window.dispatchEvent(landEvent);
              await new Promise(resolve => setTimeout(resolve, 2000));
              break;
            case 'emergency':
              const emergencyEvent = new CustomEvent('drone-command', {
                detail: { command: 'emergency' }
              });
              window.dispatchEvent(emergencyEvent);
              break;
          }
        }
      }

      setResult("코드 실행 완료");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResult(`오류 발생: ${error.message}`);
      } else {
        setResult("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <DivWithTitle
          title={"코드"}
          titleClassName={"bg-lime-500 ring-lime-500"}
          divClassName={"w-full h-2/3 ring-lime-500"}
      >
      {/* 코드 에디터 박스 */}
      <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200">
        <div className="relative p-6">

          <div className="font-mono">
            {/* 상단 고정 코드 */}
            <div className="text-black mb-4">
              <pre>{HEADER_CODE}</pre>
            </div>

            <CodeEditor
                codeInput={userCode}
                setCodeInput={setUserCode}
                placeholder={PLACEHOLDER_CODE}
            />

            {/* 하단 고정 코드 */}
            <div className="text-black mt-4">
              <pre>{FOOTER_CODE}</pre>
            </div>
          </div>
        </div>
      </div>
      </DivWithTitle>

      {/* 실행 버튼 */}
      <div className="mt-6">
        <MainButton
          title="실행하기"
          onClick={executePythonCode}
          disabled={false}
          className="w-full bg-[#E5A243] hover:bg-[#d89636] text-white font-bold py-4 rounded-2xl text-xl"
        />
      </div>

      {/* 결과 출력 */}
      <div className="mt-4">
        <CodeResult result={result} />
      </div>
    </div>
  );
};

export default Code;
