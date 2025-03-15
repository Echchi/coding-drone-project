import { useEffect, useRef, useCallback } from "react";
import { Socket } from "socket.io-client";
import { useRecoilState } from "recoil";
import { studentSocketState } from "../model/socket";
import { IStudentSocketEvents, IStudentEmitEvents } from "../../../shared/types/socket";
import { useLecture } from "../../../shared/context/lectureProvider";
import { socketManager } from "../../../shared/libs/socket";

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
      console.log("강의 코드가 없어 소켓 연결을 시도하지 않습니다");
      return;
    }

    const studentId = sessionStorage.getItem("id");
    const name = sessionStorage.getItem("name");

    if (!studentId || !name) {
      console.log("학생 정보가 없어 소켓 연결을 시도하지 않습니다");
      return;
    }

    // 이미 연결된 소켓이 있다면 연결 해제
    if (socketRef.current) {
      console.log("기존 소켓 연결 정리 중...");
      socketRef.current.disconnect();
    }

    console.log("학생 소켓 연결 시도...", {
      lectureCode: savedLecture.code,
      studentId,
      name,
    });

    const socket = socketManager.connect("/student");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("학생 소켓 연결 성공");
      updateSocketState({ isConnected: true, isCodeEnabled: true, isDroneEnabled: true });

      // 강의실 입장 시도
      socket.emit("joinLecture", {
        lectureCode: savedLecture.code,
        studentId,
        name,
      });
      console.log("강의실 참여 요청 전송:", savedLecture.code);
    });

    socket.on("joinSuccess", (response) => {
      console.log("강의실 참여 성공:", response);

      // 서버에서 받은 코드가 있으면 상태 업데이트
      if (response.code) {
        updateSocketState({ code: response.code });
      }

      // 서버에서 받은 드론 상태가 있으면 상태 업데이트
      if (response.droneStatus) {
        updateSocketState({ droneStatus: response.droneStatus });
      }

      // 서버에서 초기 상태 값 적용
      if (response.codeActive !== undefined) {
        updateSocketState({ isCodeEnabled: response.codeActive });
      }

      if (response.droneActive !== undefined) {
        updateSocketState({ isDroneEnabled: response.droneActive });
      }
    });

    // 코드 저장 응답
    socket.on("code:saved", (response) => {
      console.log("코드 저장 응답:", response);
    });

    // 코드 업데이트 이벤트
    socket.on("code:update", (data) => {
      console.log("코드 업데이트 수신:", data);
      if (data.code !== undefined) {
        updateSocketState({ code: data.code });
      }
    });

    // 코드 활성화 상태 변경
    socket.on("code:activeChanged", (data) => {
      console.log("코드 활성화 상태 변경:", data);
      const isActive = typeof data.active === "boolean" ? data.active : Boolean(data.active || data.isActive);
      updateSocketState({ isCodeEnabled: isActive });
    });

    // 드론 활성화 상태 변경
    socket.on("drone:activeChanged", (data) => {
      console.log("드론 활성화 상태 변경:", data);
      const isActive = typeof data.active === "boolean" ? data.active : Boolean(data.active || data.isActive);
      updateSocketState({ isDroneEnabled: isActive });
    });

    // 연결 해제 이벤트
    socket.on("disconnect", () => {
      console.log("❌ 소켓 연결 끊김");
      updateSocketState({ isConnected: false });
    });

    // 연결 오류
    socket.on("connect_error", (error) => {
      console.error("🚨 소켓 연결 오류:", error.message);
      updateSocketState({ isConnected: false });
    });

    // 컴포넌트 언마운트시 소켓 연결 정리
    return () => {
      console.log("소켓 연결 정리 중...");
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [savedLecture.code, updateSocketState]);

  // 코드 제출 함수
  const submitCode = useCallback(
    (code: string) => {
      if (!socketRef.current?.connected) {
        console.log("코드 제출 불가 - 소켓 연결되지 않음");
        return;
      }

      // 코드 활성화 상태만 체크
      if (!socketState.isCodeEnabled) {
        console.log("코드 제출 불가: 코드 편집 비활성화됨");
        return;
      }

      const studentId = sessionStorage.getItem("id");
      const lectureCode = savedLecture.code;

      if (!studentId || !lectureCode) {
        console.log("코드 제출에 필요한 데이터 누락");
        return;
      }

      // 로컬 상태 업데이트
      updateSocketState({ code });

      console.log("코드 제출:", { lectureCode, studentId, codeLength: code.length });
      socketRef.current.emit("code:submit", {
        lectureCode,
        studentId,
        code,
      });
    },
    [savedLecture.code, socketState.isCodeEnabled, updateSocketState]
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
