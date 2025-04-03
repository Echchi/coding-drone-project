import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { codeState } from "../model/code";
import { useStudentSocket } from "./useStudentSocket";

export const useStudentCode = () => {
  const [code, setCode] = useRecoilState(codeState);
  const { socketState, sendMessage } = useStudentSocket();

  const updateCode = useCallback(
    (newCode: string) => {
      setCode((prev) => ({
        code: newCode,
        isDirty: true,
        lastSynced: prev.lastSynced,
      }));

      // 소켓이 연결되어 있고 코드 수정이 허용된 경우에만 서버에 전송
      if (socketState.isConnected && socketState.isCodeEnabled) {
        sendMessage("code:update", { code: newCode });
        setCode((prev) => ({
          ...prev,
          isDirty: false,
          lastSynced: Date.now(),
        }));
      }
    },
    [socketState.isConnected, socketState.isCodeEnabled, sendMessage, setCode]
  );

  return {
    code: code.code,
    isDirty: code.isDirty,
    lastSynced: code.lastSynced,
    updateCode,
    isEditable: socketState.isCodeEnabled,
  };
};
