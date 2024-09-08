import { useState } from "react";
import CodeEditor from "./codeEditor/CodeEditor.tsx";
import Button from "../../../sahred/ui/Button.tsx";
import CodeResult from "./codeResult/CodeResult.tsx";

const Code = () => {
  const [codeInput, setCodeInput] = useState('console.log("hello");');
  const [result, setResult] = useState("");
  return (
    <>
      <CodeEditor codeInput={codeInput} setCodeInput={setCodeInput} />
      <Button
        title={"실행하기"}
        onClick={() => setResult("hello")}
        disabled={codeInput.length === 0}
      />
      <CodeResult result={result} />
    </>
  );
};

export default Code;
