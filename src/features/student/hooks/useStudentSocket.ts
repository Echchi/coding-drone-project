import { useEffect, useRef, useCallback } from "react";
import { Socket } from "socket.io-client";
import { useRecoilState } from "recoil";
import { studentSocketState } from "../model/socket";
import { IStudentSocketEvents, IStudentEmitEvents } from "../../../shared/types/socket";
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

    const studentId = sessionStorage.getItem("id");
    const name = sessionStorage.getItem("name");

    if (!studentId || !name) {
      console.log("Missing student information");
      return;
    }

    // 이미 연결된 소켓이 있다면 연결 해제
    if (socketRef.current) {
      console.log("Cleaning up existing socket connection");
      socketRef.current.disconnect();
    }

    console.log("Connecting to student socket...", {
      lectureCode: savedLecture.code,
      studentId,
      name,
    });

    const socket = socketManager.connect("/student");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Student socket connected successfully");

      // 강의실 입장 시도
      const joinData = {
        lectureCode: savedLecture.code,
        studentId,
        name,
      };

      console.log("Attempting to join lecture room:", joinData);
      socket.emit("joinLecture", joinData);
    });

    socket.on("joinSuccess", (response) => {
      console.log("Successfully joined lecture:", response);
      updateSocketState({ isConnected: true });

      // 서버에서 받은 코드가 있으면 상태 업데이트
      if (response.code) {
        updateSocketState({ code: response.code });
      }
    });

    socket.on("code:saved", (response) => {
      console.log("Code save response:", response);
    });

    socket.on("disconnect", () => {
      console.log("❌ Student socket disconnected");
    });

    socket.on("connect_error", (error: Error) => {
      console.error("🚨 Student socket connection error:", error);
    });

    return () => {
      console.log("Cleaning up student socket connection...");
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [savedLecture.code]);

  const submitCode = useCallback(
    (code: string) => {
      if (!socketRef.current?.connected) {
        console.log("Cannot submit code - socket not connected");
        return;
      }

      const studentId = sessionStorage.getItem("id");
      const lectureCode = savedLecture.code;

      if (!studentId || !lectureCode) {
        console.log("Missing required data for code submission");
        return;
      }

      console.log("Submitting code:", { lectureCode, studentId, codeLength: code.length });
      socketRef.current.emit("code:submit", {
        lectureCode,
        studentId,
        code,
      });
    },
    [savedLecture.code]
  );

  const sendMessage = useCallback(<T extends keyof IStudentEmitEvents>(event: T, data: IStudentEmitEvents[T]) => {
    if (!socketRef.current?.connected) return;
    socketRef.current.emit(event, data);
  }, []);

  return {
    socket: socketRef.current,
    socketState,
    submitCode,
    sendMessage,
  };
};
