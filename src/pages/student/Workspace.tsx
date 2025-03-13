import React, { useCallback } from "react";
import WorkspaceContent from "./workspaceContent.tsx";
import { useLecture } from "../../shared/context/lectureProvider.tsx";
import { useStudentSocket } from "../../features/student/hooks/useStudentSocket";

const Workspace = () => {
  const { savedLecture } = useLecture();
  const { socketState, sendMessage } = useStudentSocket();

  const handleCodeChange = useCallback(
    (code: string) => {
      if (socketState.isCodeEnabled) {
        sendMessage("code:update", { code });
      }
    },
    [socketState.isCodeEnabled, sendMessage]
  );

  const handleDroneStatusChange = useCallback(
    (status: string) => {
      if (socketState.isDroneEnabled) {
        sendMessage("drone:status", { status });
      }
    },
    [socketState.isDroneEnabled, sendMessage]
  );

  return (
    <div
      className="w-full h-full bg-amber-50 rounded-lg shadow flex flex-col pt-3 pb-8 px-8 mx-36"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-4xl font-dunggeunmiso-b text-lime-600">코딩 드론 플랫폼</p>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${socketState.isConnected ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm text-gray-600">{socketState.isConnected ? "연결됨" : "연결 안됨"}</span>
        </div>
      </div>
      <WorkspaceContent
        isCodeEnabled={socketState.isCodeEnabled}
        isDroneEnabled={socketState.isDroneEnabled}
        onCodeChange={handleCodeChange}
        onDroneStatusChange={handleDroneStatusChange}
      />
    </div>
  );
};

export default Workspace;
