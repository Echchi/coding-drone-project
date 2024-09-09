import { useState } from "react";
import CodeEditor from "./codeEditor/CodeEditor.tsx";
import MainButton from "../../../sahred/ui/MainButton.tsx";
import CodeResult from "./codeResult/CodeResult.tsx";

const Code = () => {
  const [codeInput, setCodeInput] = useState('console.log("hello");');
  const [result, setResult] = useState("");
  return (
    <>
      <CodeEditor codeInput={codeInput} setCodeInput={setCodeInput} />
      <MainButton
        title={"실행하기"}
        onClick={() => setResult("hello")}
        disabled={codeInput.length === 0}
        className="my-4"
      />
      <CodeResult result={result} />
    </>
  );
};

export default Code;
