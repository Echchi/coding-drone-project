import { SetStateAction } from "react";
import DivWithTitle from "../../ui/DivWithTitle.tsx";

interface ICodeEditorProps {
  setCodeInput: React.Dispatch<SetStateAction<string>>;
  codeInput: string;
}
const CodeEditor = ({ setCodeInput, codeInput }: ICodeEditorProps) => {
  return (
    <DivWithTitle
      title={"코드"}
      titleClassName={"bg-lime-500 ring-lime-500"}
      divClassName={"w-full h-2/3 ring-lime-500"}
    >
      <textarea
        className="w-full h-full bg-transparent p-5 text-lg outline-0 resize-none placeholder:text-3xl placeholder:font-dunggeunmiso-b font-JetBrains"
        placeholder="코드를 입력해보세요"
        onChange={(event) => setCodeInput(event.target.value)}
        value={codeInput}
      ></textarea>
    </DivWithTitle>
  );
};

export default CodeEditor;
