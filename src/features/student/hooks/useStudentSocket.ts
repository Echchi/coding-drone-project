import { useEffect, useRef, useCallback } from "react";
import { Socket } from "socket.io-client";
import { useRecoilState } from "recoil";
import { studentSocketState } from "../model/socket";
import { IStudentSocketEvents, IStudentEmitEvents } from "../types/socket";
import { useLecture } from "../../../shared/context/lectureProvider";
import { socketManager } from "../../../shared/libs/socket";
import { useAuth } from "../../../shared/context/authContext.tsx";
export const useStudentSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { savedLecture } = useLecture();
  const [socketState, setSocketState] = useRecoilState(studentSocketState);

  const updateSocketState = useCallback(
    (updates: Partial<typeof socketState>) => {
      setSocketState((prev) => ({ ...prev, ...updates }));
    },
    [setSocketState]
  );

  useEffect(() => {
    if (!savedLecture.code) {
      console.log("No lecture code found, skipping socket connection");
      return;
    }

    const socket = socketManager.connect(`/student`);
    socketRef.current = socket;

    console.log("Attempting to connect to student socket...");

    socket.on("connect", () => {
      const id = sessionStorage.getItem("id");
      const name = sessionStorage.getItem("name");

      console.log("Student socket connected successfully with:", {
        lectureCode: savedLecture.code,
        studentId: id,
        name: name,
      });

      if (!id || !name) {
        console.error("Missing student information:", { id, name });
        return;
      }

      socket.emit("joinLecture", {
        lectureCode: savedLecture.code,
        studentId: id,
        name,
      });

      console.log("Emitted joinLecture event");
      updateSocketState({ isConnected: true });
    });

    socket.on("joinSuccess", (data) => {
      console.log("Successfully joined lecture:", data);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      console.error("Connection details:", {
        namespace: "/student",
        lectureCode: savedLecture.code,
      });
      updateSocketState({ isConnected: false });
    });

    socket.on("code:update", (data: IStudentSocketEvents["code:update"]) => {
      console.log("Code update received:", data);
      // TODO: 코드 에디터 업데이트 처리
    });

    socket.on("control:update", (data: IStudentSocketEvents["control:update"]) => {
      console.log("Control update received:", data);
      if (data.type === "code") {
        updateSocketState({ isCodeEnabled: data.value });
      } else if (data.type === "drone") {
        updateSocketState({ isDroneEnabled: data.value });
      }
    });

    socket.on("disconnect", () => {
      console.log("Student socket disconnected");
      updateSocketState({ isConnected: false });
    });

    return () => {
      console.log("Cleaning up student socket connection...");
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [savedLecture.code, updateSocketState]);

  const sendMessage = useCallback(<T extends keyof IStudentEmitEvents>(event: T, data: IStudentEmitEvents[T]) => {
    if (!socketRef.current?.connected) return;
    socketRef.current.emit(event, data);
  }, []);

  return {
    socket: socketRef.current,
    socketState,
    sendMessage,
  };
};
