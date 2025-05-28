import { useEffect, useMemo, useRef, useState } from "react";
import { useStudentSocket } from "../../../../features/student/hooks/useStudentSocket";
import { useCodeExecution } from "../../../../features/student/hooks/useCodeExecution";
import { INITIAL_CODE, HEADER_CODE, FOOTER_CODE } from "../../../../shared/constants/code";
import DivWithTitle from "../../../../shared/ui/DivWithTitle";

interface CodeEditorProps {
  className?: string;
}

export const CodeEditor = ({ className }: CodeEditorProps) => {
  const { socketState, submitCode } = useStudentSocket();
  const { result, executePythonCode, isCodeEnabled } = useCodeExecution();
  const [localCode, setLocalCode] = useState(socketState.code || INITIAL_CODE);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 소켓에서 받은 코드로 로컬 상태 업데이트
  useEffect(() => {
    if (socketState.code !== undefined && socketState.code !== localCode) {
      setLocalCode(socketState.code);
    }
  }, [socketState.code, localCode]);

  // 디바운스된 코드 제출 함수
  const debouncedSubmitCode = useMemo(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    return (code: string) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        submitCode(code);
      }, 500);
    };
  }, [submitCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setLocalCode(newCode);

    if (isCodeEnabled) {
      debouncedSubmitCode(newCode);
    }
  };

  const handleExecuteCode = () => {
    executePythonCode(localCode);
  };

  return (
    <DivWithTitle
      title={"코드 에디터"}
      titleClassName={"bg-lime-500 ring-lime-500"}
      divClassName={"w-full h-2/3 ring-lime-500"}
    >
      <div className="h-full overflow-y-auto flex flex-col">
        <pre className="px-6 py-4 text-sm flex-shrink-0">{HEADER_CODE}</pre>

        <div className="flex-1 min-h-0 relative">
          <textarea
            ref={textareaRef}
            value={localCode}
            onChange={handleCodeChange}
            disabled={!isCodeEnabled}
            className={`flex-1 p-4 font-mono text-sm border-none outline-none resize-none ${isCodeEnabled
              ? "bg-gray-900 text-green-400"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            placeholder={
              isCodeEnabled
                ? "여기에 Python 코드를 입력하세요..."
                : "코드 편집이 비활성화되었습니다."
            }
            spellCheck={false}
          />
        </div>
        {!isCodeEnabled && (
          <div className="absolute bg-zinc-500/70 w-full h-full rounded-tr-lg rounded-b-lg flex justify-center items-center">
            <p className="text-white text-2xl font-bold">코드 작성 비활성화</p>
          </div>
        )}
        <div className="bg-gray-800 p-2 border-t border-gray-600">
          <button
            onClick={handleExecuteCode}
            disabled={!isCodeEnabled}
            className={`px-4 py-2 rounded text-sm font-medium ${isCodeEnabled
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
          >
            코드 실행
          </button>
        </div>
        {result && (
          <div className="h-32 bg-black text-green-400 p-4 font-mono text-sm overflow-auto border-t border-gray-600">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        <pre className="px-6 py-4 text-sm flex-shrink-0">{FOOTER_CODE}</pre>
      </div>
    </DivWithTitle>
  );
};

export default CodeEditor;
