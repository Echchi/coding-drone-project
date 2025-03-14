import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useStudentSocket } from "../../../../features/student/hooks/useStudentSocket";
import { debounce } from "../../../../shared/utils/debounce";
import DivWithTitle from "../../ui/DivWithTitle";

interface CodeEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export const CodeEditor = ({ initialValue, onChange, readOnly = false }: CodeEditorProps) => {
  const { submitCode } = useStudentSocket();
  const [editorValue, setEditorValue] = useState(
    initialValue || "# 파이썬으로 Hello, World! 출력하기\nprint('Hello, World!')"
  );

  useEffect(() => {
    if (initialValue) {
      setEditorValue(initialValue);
    }
  }, [initialValue]);

  // 디바운스된 코드 제출 함수 생성
  const debouncedSubmitCode = debounce((code: string) => {
    submitCode(code);
  }, 500);

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;

    setEditorValue(value);
    onChange?.(value);

    if (!readOnly) {
      debouncedSubmitCode(value);
    }
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
      <div className="h-full">
        <MonacoEditor
          height="100%"
          defaultLanguage="python"
          theme="light"
          value={editorValue}
          onChange={handleEditorChange}
          className="rounded-lg py-4"
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
    </DivWithTitle>
  );
};
