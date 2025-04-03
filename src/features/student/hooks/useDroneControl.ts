import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { droneState, IDroneState } from "../model/drone";
import { useStudentSocket } from "./useStudentSocket";
import { useLecture } from "../../../shared/context/lectureProvider";

export const useDroneControl = () => {
  const [drone, setDrone] = useRecoilState(droneState);
  const { socketState, sendMessage } = useStudentSocket();
  const { savedLecture } = useLecture();

  // 드론 연결 상태 업데이트 및 서버 전송
  const updateDroneConnection = useCallback(
    (isConnected: boolean) => {
      setDrone((prev) => ({ ...prev, isConnected }));

      // 소켓이 연결되어 있고 드론 제어가 허용된 경우에만 서버에 전송
      if (socketState.isConnected && socketState.isDroneEnabled) {
        const studentId = sessionStorage.getItem("id");
        if (studentId && savedLecture.code) {
          const status = isConnected ? "connected" : "disconnected";
          sendMessage("drone:update", {
            status,
            lectureCode: savedLecture.code,
            studentId,
          });
        }
      }
    },
    [socketState.isConnected, socketState.isDroneEnabled, sendMessage, setDrone, savedLecture.code]
  );

  // 드론 상태 업데이트
  const updateDroneState = useCallback(
    (updates: Partial<IDroneState>) => {
      setDrone((prev) => ({ ...prev, ...updates }));

      // 연결 상태가 변경된 경우 서버에 알림
      if (updates.isConnected !== undefined && updates.isConnected !== drone.isConnected) {
        const studentId = sessionStorage.getItem("id");
        if (studentId && savedLecture.code && socketState.isConnected && socketState.isDroneEnabled) {
          const status = updates.isConnected ? "connected" : "disconnected";
          sendMessage("drone:update", {
            status,
            lectureCode: savedLecture.code,
            studentId,
          });
        }
      }
    },
    [drone.isConnected, setDrone, socketState.isConnected, socketState.isDroneEnabled, sendMessage, savedLecture.code]
  );

  // 소켓으로부터 드론 상태 업데이트 수신
  useEffect(() => {
    if (socketState.droneStatus) {
      const isConnected = socketState.droneStatus === "connected";
      setDrone((prev) => ({ ...prev, isConnected }));
    }
  }, [socketState.droneStatus, setDrone]);

  return {
    drone,
    updateDroneConnection,
    updateDroneState,
  };
};
