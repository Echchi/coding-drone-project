import { SetStateAction } from "react";
import DivWithTitle from "../../ui/DivWithTitle.tsx";

interface ICodeEditorProps {
  setCodeInput: React.Dispatch<SetStateAction<string>>;
  codeInput: string;
  placeholder?: string;
}

const CodeEditor = ({ setCodeInput, codeInput, placeholder }: ICodeEditorProps) => {
  return (
    <textarea
      className="w-full min-h-[200px] bg-transparent pr-5 text-lg outline-0 resize-none font-mono text-gray-600 placeholder:text-lg placeholder:text-gray-400"
      placeholder={placeholder}
      onChange={(event) => setCodeInput(event.target.value)}
      value={codeInput}
      spellCheck={false}
    />
  );
};

export default CodeEditor;
