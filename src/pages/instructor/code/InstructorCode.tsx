import { useState, useEffect } from "react";
import MainButton from "../../../shared/ui/MainButton.tsx";
import CodeResult from "../../student/code/codeResult/CodeResult.tsx";
import CodeEditor from "../../student/code/codeEditor/CodeEditor.tsx";
import { FOOTER_CODE, HEADER_CODE } from "../../../features/student/constants/code";
import { useInstructorSocket } from "../../../features/instructor/hooks/useInstructorSocket";
import { useLecture } from "../../../shared/context/lectureProvider.tsx";

interface InstructorCodeProps {
  studentId: string;
  studentName: string;
  initialCode: string;
  codeActive: boolean;
  droneActive: boolean;
  droneStatus: string;
  sendMessage: <T extends string, D>(event: T, data: D) => void;
}

const InstructorCode = ({
  studentId,
  studentName,
  initialCode,
  codeActive,
  droneActive,
  droneStatus,
  sendMessage,
}: InstructorCodeProps) => {
  const [userCode, setUserCode] = useState(initialCode || "");

  const [result, setResult] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");
  const { savedLecture } = useLecture();

  useEffect(() => {
    // 초기 코드 설정
    setUserCode(initialCode);
    setHasChanges(false);
    setResult("");
    setError("");
  }, [initialCode, studentId]);

  // 코드가 변경되면 변경 사항이 있음을 표시
  const handleCodeChange = (newCode: string) => {
    setUserCode(newCode);
    if (newCode !== initialCode) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
    // 결과 메시지 초기화
    setResult("");
    setError("");
  };

  // 상태 표시 메시지
  const getStatusMessage = () => {
    if (!codeActive && !droneActive) return "코드 실행과 드론 조작이 비활성화 상태입니다.";
    if (!codeActive) return "코드 실행이 비활성화 상태입니다.";
    if (!droneActive) return "드론 조작이 비활성화 상태입니다.";
    if (droneStatus === "disconnected") return "드론이 연결되어 있지 않습니다.";
    return null;
  };

  const statusMessage = getStatusMessage();

  // 코드 저장 핸들러
  const handleSaveCode = () => {
    try {
      if (!studentId) {
        setError("학생 ID가 유효하지 않습니다.");
        return;
      }

      sendMessage("code:instructorEdit", {
        lectureCode: savedLecture.code,
        studentId,
        code: userCode,
      });

      setHasChanges(false);
      setResult("코드가 성공적으로 저장되었습니다.");

      // 3초 후 결과 메시지 숨기기
      setTimeout(() => {
        setResult("");
      }, 3000);
    } catch (err) {
      setError(`코드 저장 중 오류가 발생했습니다: ${err instanceof Error ? err.message : "알 수 없는 오류"}`);
      console.error("코드 저장 오류:", err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {statusMessage && (
        <div className="bg-rose-100 border-l-4 border-rose-500 text-rose-700 font-semibold p-4 mb-4 rounded">
          <p>{statusMessage}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 font-semibold p-4 mb-4 rounded">
          <p>{error}</p>
        </div>
      )}

      <CodeEditor
        codeInput={userCode}
        setCodeInput={(value) => {
          if (typeof value === "function") {
            const newValue = value(userCode);
            handleCodeChange(newValue);
          } else {
            handleCodeChange(value);
          }
        }}
        isCodeEnabled={true}
        readOnly={false}
      />

      <MainButton
        title="변경사항 저장"
        onClick={handleSaveCode}
        disabled={!hasChanges}
        className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-lg mt-6"
      />
    </div>
  );
};

export default InstructorCode;
