import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useStudentSocket } from "../../../../features/student/hooks/useStudentSocket";
import { debounce } from "../../../../shared/utils/debounce";
import DivWithTitle from "../../ui/DivWithTitle";
import { HEADER_CODE, FOOTER_CODE } from "../../../../features/student/constants/code";
interface CodeEditorProps {
  codeInput: string;
  setCodeInput: React.Dispatch<React.SetStateAction<string>>;
  readOnly?: boolean;
  placeholder?: string;
}

const CodeEditor = ({ codeInput, setCodeInput, readOnly = false, placeholder }: CodeEditorProps) => {
  const { submitCode } = useStudentSocket();
  const [editorValue, setEditorValue] = useState(codeInput);

  useEffect(() => {
    setEditorValue(codeInput);
  }, [codeInput]);

  // 디바운스된 코드 제출 함수
  const debouncedSubmitCode = debounce((code: string) => {
    submitCode(code);
  }, 500);

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;

    setEditorValue(value);
    setCodeInput(value); // `drone-control`의 상태 관리 방식 유지
    debouncedSubmitCode(value);
  };

  // 컴포넌트 언마운트 시 디바운스 취소
  useEffect(() => {
    return () => {
      debouncedSubmitCode.cancel?.();
    };
  }, []);

  return (
    <DivWithTitle
      title={"코드 에디터"}
      titleClassName={"bg-lime-500 ring-lime-500"}
      divClassName={"w-full h-2/3 ring-lime-500"}
    >
      <div className="h-full overflow-y-auto flex flex-col">
        <pre className="px-6 py-4 text-sm flex-shrink-0">{HEADER_CODE}</pre>

        <div className="flex-1 min-h-0">
          <MonacoEditor
            height="100%"
            defaultLanguage="python"
            theme="light"
            value={editorValue}
            onChange={handleEditorChange}
            className="rounded-lg"
            options={{
              readOnly,
              minimap: { enabled: false },
              fontSize: 16,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              lineNumbers: "off",
              renderLineHighlight: "none",
              overviewRulerBorder: false,
              scrollbar: {
                vertical: "hidden",
                horizontal: "hidden",
              },
              domReadOnly: true,
              cursorStyle: "line",
              cursorBlinking: "solid",
            }}
          />
        </div>

        <pre className="px-6 py-4 text-sm flex-shrink-0">{FOOTER_CODE}</pre>
      </div>
    </DivWithTitle>
  );
};

export default CodeEditor;
