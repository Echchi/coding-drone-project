import { useCallback, useState } from "react";
import { useStudentSocket } from "./useStudentSocket";
import { HEADER_CODE, FOOTER_CODE, DRONE_COMMAND_DELAYS } from "../constants/code";
import { IDroneCommand } from "../../../shared/types/code";

export const useCodeExecution = () => {
  const { socketState } = useStudentSocket();
  const [result, setResult] = useState("");
  const [isDroneConnected, setIsDroneConnected] = useState(false);

  const getFullCode = useCallback((userCode: string) => {
    return `${HEADER_CODE}\n${userCode}\n${FOOTER_CODE}`;
  }, []);

  // 실제 파이썬 코드 실행 (드론 연결 필요)
  const executePythonCode = useCallback(
    async (userCode: string) => {
      if (!isDroneConnected) {
        setResult("드론이 연결되어 있지 않습니다. 먼저 드론을 연결하세요.");
        return;
      }

      try {
        setResult("코드 실행 중...");
        const fullCode = getFullCode(userCode);
        const commands = fullCode.match(/drone\.(send\w+|go|move|hover|turn|flip)\([^)]*\)|sleep\([\d.]+\)/g) || [];

        let executionLog = "";

        for (const cmd of commands) {
          if (cmd.includes("sleep")) {
            const seconds = parseFloat(cmd.match(/sleep\(([\d.]+)\)/)?.[1] || "0");
            executionLog += `${cmd} 실행: ${seconds}초 대기\n`;
            await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
            continue;
          }

          const droneCommand = (() => {
            if (cmd.includes("sendTakeOff") || cmd.includes("takeoff")) return { type: "takeoff" as const };
            if (cmd.includes("sendLanding") || cmd.includes("land")) return { type: "land" as const };
            if (cmd.includes("emergencyStop") || cmd.includes("emergency")) return { type: "emergency" as const };

            // 추가 커맨드 파싱
            if (cmd.includes("move_forward")) {
              const match = cmd.match(/move_forward\(([\d.]+)\)/);
              const distance = match ? match[1] : "0";
              return { type: "move", direction: "forward", distance };
            }
            if (cmd.includes("move_backward")) {
              const match = cmd.match(/move_backward\(([\d.]+)\)/);
              const distance = match ? match[1] : "0";
              return { type: "move", direction: "backward", distance };
            }
            if (cmd.includes("turn_right")) {
              const match = cmd.match(/turn_right\(([\d.]+)\)/);
              const angle = match ? match[1] : "0";
              return { type: "turn", direction: "right", angle };
            }
            if (cmd.includes("turn_left")) {
              const match = cmd.match(/turn_left\(([\d.]+)\)/);
              const angle = match ? match[1] : "0";
              return { type: "turn", direction: "left", angle };
            }

            return null;
          })();

          if (droneCommand) {
            if (droneCommand.type === "takeoff") {
              executionLog += `${cmd} 실행: 드론 이륙\n`;
            } else if (droneCommand.type === "land") {
              executionLog += `${cmd} 실행: 드론 착륙\n`;
            } else if (droneCommand.type === "emergency") {
              executionLog += `${cmd} 실행: 비상 정지\n`;
            } else if (droneCommand.type === "move") {
              executionLog += `${cmd} 실행: ${droneCommand.direction === "forward" ? "전진" : "후진"} ${droneCommand.distance}m\n`;
            } else if (droneCommand.type === "turn") {
              executionLog += `${cmd} 실행: ${droneCommand.direction === "right" ? "우회전" : "좌회전"} ${droneCommand.angle}°\n`;
            }

            if (droneCommand.type === "takeoff" || droneCommand.type === "land" || droneCommand.type === "emergency") {
              const event = new CustomEvent("drone-command", {
                detail: { command: droneCommand.type },
              });
              window.dispatchEvent(event);
              await new Promise((resolve) =>
                setTimeout(
                  resolve,
                  droneCommand.type === "takeoff"
                    ? DRONE_COMMAND_DELAYS.takeoff
                    : droneCommand.type === "land"
                      ? DRONE_COMMAND_DELAYS.land
                      : DRONE_COMMAND_DELAYS.emergency
                )
              );
            }
            // 다른 타입의 명령은 아직 이벤트 처리가 구현되지 않았으므로 로그만 남김
          } else {
            executionLog += `${cmd} 실행: 알 수 없는 명령\n`;
          }
        }

        setResult(executionLog ? `[실행 결과]\n${executionLog}코드 실행 완료` : "실행할 드론 명령이 없습니다.");
      } catch (error: unknown) {
        setResult(error instanceof Error ? `오류 발생: ${error.message}` : "알 수 없는 오류가 발생했습니다.");
      }
    },
    [isDroneConnected, getFullCode]
  );

  return {
    result,
    isDroneConnected,
    setIsDroneConnected,
    executePythonCode,
  };
};
