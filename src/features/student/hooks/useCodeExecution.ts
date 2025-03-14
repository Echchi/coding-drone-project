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

  const executePythonCode = useCallback(
    async (userCode: string) => {
      if (!isDroneConnected) {
        setResult("드론이 연결되어 있지 않습니다. 먼저 드론을 연결해주세요.");
        return;
      }

      try {
        const fullCode = getFullCode(userCode);
        const commands = fullCode.match(/drone\.(send\w+|go|move|hover|turn|flip)\([^)]*\)|sleep\([\d.]+\)/g) || [];

        for (const cmd of commands) {
          if (cmd.includes("sleep")) {
            const seconds = parseFloat(cmd.match(/sleep\(([\d.]+)\)/)?.[1] || "0");
            await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
            continue;
          }

          const droneCommand = (() => {
            if (cmd.includes("sendTakeOff")) return { type: "takeoff" as const };
            if (cmd.includes("sendLanding")) return { type: "land" as const };
            if (cmd.includes("emergencyStop")) return { type: "emergency" as const };
            return null;
          })();

          if (droneCommand) {
            const event = new CustomEvent("drone-command", {
              detail: { command: droneCommand.type },
            });
            window.dispatchEvent(event);
            await new Promise((resolve) => setTimeout(resolve, DRONE_COMMAND_DELAYS[droneCommand.type]));
          }
        }

        setResult("코드 실행 완료");
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
