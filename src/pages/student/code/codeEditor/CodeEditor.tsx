import { SetStateAction } from "react";

interface ICodeEditorProps {
  setCodeInput: React.Dispatch<SetStateAction<string>>;
  codeInput: string;
}
const CodeEditor = ({ setCodeInput, codeInput }: ICodeEditorProps) => {
  return (
    <div className="w-full h-2/3 bg-white rounded-lg shadow ring ring-lime-500">
      <textarea
        className="w-full h-full bg-transparent p-5 text-lg outline-0 resize-none placeholder:text-3xl placeholder:font-dunggeunmiso-b"
        placeholder="코드를 입력해보세요"
        onChange={(event) => setCodeInput(event.target.value)}
        value={codeInput}
      ></textarea>
    </div>
  );
};

export default CodeEditor;
