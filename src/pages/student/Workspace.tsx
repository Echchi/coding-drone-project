import CodeEditor from "./code/codeEditor/CodeEditor.tsx";
import Button from "../../sahred/ui/Button.tsx";
import CodeResult from "./code/codeResult/CodeResult.tsx";
import Code from "./code/Code.tsx";

const Workspace = () => {
  return (
    <div className="w-full h-full bg-amber-50 rounded-lg shadow flex flex-col p-5 mx-14">
      <div className="w-full h-full grid grid-cols-4">
        <div className="col-span-3 flex flex-col space-y-4">
          <Code />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
