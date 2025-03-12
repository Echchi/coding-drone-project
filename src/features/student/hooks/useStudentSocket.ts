import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { socketManager } from "../../../shared/libs/socket";
import { useLecture } from "../../../shared/context/lectureProvider";

export const useStudentSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { savedLecture } = useLecture();

  useEffect(() => {
    if (!savedLecture.code) return;

    // 학생 네임스페이스로 연결
    socketRef.current = socketManager.connect(`/student/${savedLecture.code}`);

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Student socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Student socket disconnected");
    });

    socket.on("error", (error: Error) => {
      console.error("Student socket error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, [savedLecture.code]);

  return socketRef.current;
};
