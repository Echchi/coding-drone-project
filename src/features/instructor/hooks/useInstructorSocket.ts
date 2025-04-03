import { useEffect, useRef, useCallback } from "react";
import { Socket } from "socket.io-client";
import { socketManager } from "../../../shared/libs/socket";
import { useLecture } from "../../../shared/context/lectureProvider";
import { useRecoilState } from "recoil";
import { studentListState } from "../../../shared/state/atom";
import { IStudent } from "../../../shared/types/student";
import { useAuth } from "../../../shared/context/authContext";

export const useInstructorSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { savedLecture } = useLecture();
  const { role } = useAuth();
  const [studentList, setStudentList] = useRecoilState(studentListState);

  useEffect(() => {
    if (!savedLecture.code || role !== "instructor") {
      console.log("Missing required data:", {
        lectureCode: savedLecture.code,
        role,
      });
      return;
    }

    const instructorId = sessionStorage.getItem("instructorId");
    if (!instructorId) {
      console.log("No instructor ID found in session storage");
      return;
    }

    // 이미 연결된 소켓이 있다면 연결 해제
    if (socketRef.current) {
      console.log("Cleaning up existing socket connection");
      socketRef.current.disconnect();
    }

    console.log("Connecting to instructor socket...", {
      lectureCode: savedLecture.code,
      instructorId,
    });

    const socket = socketManager.connect("/instructor");

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Instructor socket connected successfully");

      // 강의실 입장 시도
      const joinData = {
        lectureCode: savedLecture.code,
        role: "instructor",
        instructorId,
      };

      console.log("Attempting to join lecture room:", joinData);
      socket.emit("joinLecture", joinData);
    });

    socket.on("joinResponse", (response) => {
      console.log("Received join response:", response);
      if (response.success && response.students) {
        // 초기 학생 목록 설정
        const initialStudentList: Record<string, IStudent> = {};

        // students 배열을 studentList 형태로 변환
        response.students.forEach((student: IStudent) => {
          initialStudentList[student.studentId] = {
            studentId: student.studentId,
            name: student.name,
            code: student.code || "",
            droneStatus: student.droneStatus || "disconnected",
            isConnected: true,
            codeActive: student.codeActive || false,
            droneActive: student.droneActive || false,
          };
        });

        setStudentList(initialStudentList);
        console.log("Initial student list set:", initialStudentList);
      }
    });

    // 학생 입장 이벤트 수신
    socket.on("studentJoined", (data) => {
      console.log("👉 학생 입장 감지:", data);
      const { studentId, name, students } = data;

      // 학생 목록 전체 갱신
      if (students && Array.isArray(students)) {
        const updatedStudentList: Record<string, IStudent> = {};

        students.forEach((student: IStudent) => {
          updatedStudentList[student.studentId] = {
            studentId: student.studentId,
            name: student.name,
            code: student.code || "",
            droneStatus: student.droneStatus || "disconnected",
            isConnected: true,
            codeActive: student.codeActive || false,
            droneActive: student.droneActive || false,
          };
        });

        setStudentList(updatedStudentList);
        console.log("학생 목록 전체 갱신:", updatedStudentList);
      }
      // 단일 학생 추가
      else {
        setStudentList((prev) => {
          const newList = {
            ...prev,
            [studentId]: {
              studentId,
              name,
              code: "",
              droneStatus: "disconnected",
              isConnected: true,
              codeActive: false,
              droneActive: false,
            },
          };
          console.log("학생 목록 업데이트 완료:", newList);
          return newList;
        });
      }
    });

    // 코드 업데이트 이벤트 수신
    socket.on("code:updated", (data) => {
      console.log("👨‍💻 학생 코드 업데이트 감지:", data);
      const { studentId, code, students } = data;

      // 학생 목록 전체 갱신
      if (students && Array.isArray(students)) {
        const updatedStudentList: Record<string, IStudent> = {};

        students.forEach((student: IStudent) => {
          updatedStudentList[student.studentId] = {
            studentId: student.studentId,
            name: student.name,
            code: student.code || "",
            droneStatus: student.droneStatus || "disconnected",
            isConnected: true,
          };
        });

        setStudentList(updatedStudentList);
        console.log("학생 목록 전체 갱신:", updatedStudentList);
      }
      // 단일 학생 코드만 업데이트
      else {
        setStudentList((prev) => {
          if (!prev[studentId]) return prev;

          const newList = {
            ...prev,
            [studentId]: {
              ...prev[studentId],
              code,
            },
          };
          console.log("학생 코드 업데이트 완료:", newList);
          return newList;
        });
      }
    });

    // 드론 상태 업데이트 이벤트 수신
    socket.on("drone:updated", (data) => {
      console.log("🚁 학생 드론 상태 업데이트 감지:", data);
      const { studentId, status, students } = data;

      // 학생 목록 전체 갱신
      if (students && Array.isArray(students)) {
        const updatedStudentList: Record<string, IStudent> = {};

        students.forEach((student: IStudent) => {
          updatedStudentList[student.studentId] = {
            studentId: student.studentId,
            name: student.name,
            code: student.code || "",
            droneStatus: student.droneStatus || "disconnected",
            isConnected: true,
          };
        });

        setStudentList(updatedStudentList);
        console.log("학생 목록 전체 갱신:", updatedStudentList);
      }
      // 단일 학생 드론 상태만 업데이트
      else {
        setStudentList((prev) => {
          if (!prev[studentId]) return prev;

          const newList = {
            ...prev,
            [studentId]: {
              ...prev[studentId],
              droneStatus: status,
            },
          };
          console.log("학생 드론 상태 업데이트 완료:", newList);
          return newList;
        });
      }
    });

    // 코드 활성화 상태 변경 이벤트 수신
    socket.on("code:activeChanged", (data) => {
      console.log("👨‍💻 학생 코드 활성화 상태 변경:", data);
      const { studentId, active, students } = data;

      // 학생 목록 전체 갱신
      if (students && Array.isArray(students)) {
        const updatedStudentList: Record<string, IStudent> = {};

        students.forEach((student: IStudent) => {
          updatedStudentList[student.studentId] = {
            studentId: student.studentId,
            name: student.name,
            code: student.code || "",
            droneStatus: student.droneStatus || "disconnected",
            isConnected: true,
            codeActive: student.codeActive !== undefined ? student.codeActive : active,
          };
        });

        setStudentList(updatedStudentList);
        console.log("학생 목록 전체 갱신:", updatedStudentList);
      }
      // 단일 학생 코드 활성화 상태만 업데이트
      else {
        setStudentList((prev) => {
          if (!prev[studentId]) return prev;

          const newList = {
            ...prev,
            [studentId]: {
              ...prev[studentId],
              codeActive: active,
            },
          };
          console.log("학생 코드 활성화 상태 업데이트 완료:", newList);
          return newList;
        });
      }
    });

    // 드론 활성화 상태 변경 이벤트 수신
    socket.on("drone:activeChanged", (data) => {
      console.log("🚁 학생 드론 활성화 상태 변경:", data);
      const { studentId, active, students } = data;

      // 학생 목록 전체 갱신
      if (students && Array.isArray(students)) {
        const updatedStudentList: Record<string, IStudent> = {};

        students.forEach((student: IStudent) => {
          updatedStudentList[student.studentId] = {
            studentId: student.studentId,
            name: student.name,
            code: student.code || "",
            droneStatus: student.droneStatus || "disconnected",
            isConnected: true,

            droneActive: student.droneActive !== undefined ? student.droneActive : active,
          };
        });

        setStudentList(updatedStudentList);
        console.log("학생 목록 전체 갱신:", updatedStudentList);
      }
      // 단일 학생 드론 활성화 상태만 업데이트
      else {
        setStudentList((prev) => {
          if (!prev[studentId]) return prev;

          const newList = {
            ...prev,
            [studentId]: {
              ...prev[studentId],
              droneActive: active,
            },
          };
          console.log("학생 드론 활성화 상태 업데이트 완료:", newList);
          return newList;
        });
      }
    });

    // 학생 퇴장
    socket.on("studentLeft", (data) => {
      console.log("👋 학생 퇴장 감지:", data);
      const { studentId, students } = data;

      setStudentList((prev) => {
        const newList = { ...prev };
        delete newList[studentId];
        console.log("학생 목록 업데이트 완료:", newList);
        return newList;
      });
    });

    // 코드 수정 응답 처리
    socket.on("code:editResponse", (data) => {
      console.log("🖊️ 코드 수정 응답 수신:", data);
      const { success, studentId } = data;

      if (success) {
        // 성공 처리 (알림 표시 등)
        console.log(`학생 ${studentId}의 코드가 성공적으로 수정되었습니다.`);
      } else {
        // 실패 처리
        console.error(`학생 ${studentId}의 코드 수정에 실패했습니다.`);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Instructor socket disconnected");
    });

    socket.on("connect_error", (error: Error) => {
      console.error("🚨 Instructor socket connection error:", error);
      console.error("Connection details:", {
        namespace: "/instructor",
        lectureCode: savedLecture.code,
        instructorId,
      });
    });

    socket.on("error", (error) => {
      console.error("🚨 Socket error:", {
        message: error.message,
        stack: error.stack,
      });
    });

    return () => {
      console.log("Cleaning up instructor socket connection...");
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [savedLecture.code, role, setStudentList]);

  const sendMessage = useCallback((event: string, data: unknown) => {
    if (!socketRef.current?.connected) {
      console.log("Cannot send message - socket not connected");
      return;
    }
    console.log("Sending socket message:", { event, data });
    socketRef.current.emit(event, data);
  }, []);

  return {
    studentList,
    socket: socketRef.current,
    sendMessage,
  };
};
