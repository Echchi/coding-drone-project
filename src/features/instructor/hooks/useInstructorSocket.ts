import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { socketManager } from "../../../shared/libs/socket";
import { useLecture } from "../../../shared/context/lectureProvider";
import { useRecoilState } from "recoil";
import { studentListState } from "../../../shared/state/atom";
import { IStudent, ISocketEvents } from "../types/student";

export const useInstructorSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { savedLecture } = useLecture();
  const [studentList, setStudentList] = useRecoilState(studentListState);

  useEffect(() => {
    if (!savedLecture.code) return;

    const socket = socketManager.connect(`/instructor`);
    socketRef.current = socket;

    console.log("Attempting to connect to socket...");

    socket.on("connect", () => {
      console.log("Instructor socket connected successfully");
      socket.emit("joinLecture", { lectureCode: savedLecture.code });
    });

    // 학생 입장
    socket.on("student:join", (data: ISocketEvents["student:join"]) => {
      console.log("Student joined:", data);
      setStudentList((prev) => ({
        ...prev,
        [data.index]: { ...data.student, isConnected: true },
      }));
    });

    // 학생 퇴장
    socket.on("student:leave", (data: ISocketEvents["student:leave"]) => {
      console.log("Student left:", data);
      setStudentList((prev) => {
        const newList = { ...prev };
        delete newList[data.index];
        return newList;
      });
    });

    // 학생 코드 업데이트
    socket.on("student:code:update", (data: ISocketEvents["student:code:update"]) => {
      console.log("Student code updated:", data);
      setStudentList((prev) => ({
        ...prev,
        [data.index]: {
          ...prev[data.index],
          code: data.code,
        },
      }));
    });

    // 학생 드론 상태 업데이트
    socket.on("student:drone:status", (data: ISocketEvents["student:drone:status"]) => {
      console.log("Student drone status:", data);
      setStudentList((prev) => ({
        ...prev,
        [data.index]: {
          ...prev[data.index],
          droneStatus: data.status,
        },
      }));
    });

    socket.on("disconnect", () => {
      console.log("Instructor socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      console.log("Cleaning up socket connection...");
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [savedLecture.code, setStudentList]);

  return {
    studentList,
    socket: socketRef.current,
    sendMessage: (event: string, data: unknown) => {
      socketRef.current?.emit(event, data);
    },
  };
};
