import CodeEditor from "./code/codeEditor/CodeEditor.tsx";
import Button from "../../sahred/ui/Button.tsx";
import CodeResult from "./code/codeResult/CodeResult.tsx";
import Code from "./code/Code.tsx";

const Workspace = () => {
  return (
    <div className="w-full h-full bg-amber-50 rounded-lg shadow flex flex-col p-5 mx-14">
      <div className="w-full h-full grid grid-cols-4 gap-x-4">
        <div className="col-span-3 flex flex-col space-y-4">
          <Code />
        </div>
        <div className="w-full h-full flex flex-col space-y-4">
          <div className="h-1/2">
            <div className="w-full h-full rounded-lg bg-white ring ring-lime-500"></div>
          </div>
          <div className="h-1/2">
            <div className="w-full h-full rounded-lg bg-white ring ring-lime-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
