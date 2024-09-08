import CodeEditor from "./code/codeEditor/CodeEditor.tsx";
import MainButton from "../../sahred/ui/MainButton.tsx";
import CodeResult from "./code/codeResult/CodeResult.tsx";
import Code from "./code/Code.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull, faMinus } from "@fortawesome/free-solid-svg-icons";

const Workspace = () => {
  return (
    <div className="w-full h-full bg-amber-50 rounded-lg shadow flex flex-col p-5 mx-14">
      <div className="w-full h-full grid grid-cols-4 gap-x-4">
        <div className="col-span-3 flex flex-col space-y-4">
          <Code />
        </div>
        <div className="w-full h-full flex flex-col space-y-4">
          <div className="h-1/2">
            <div className="w-full h-full flex flex-col rounded-lg bg-white ring ring-blue-500 p-4">
              <div className="w-full text-lg flex items-center justify-between *:text-blue-700">
                <div className="w-5 aspect-square rounded-full bg-green-500" />
                <div className="flex w-full px-2">
                  <div className="font-bold">Co Drone Mini</div>
                </div>
                <p className="flex items-center space-x-1 ">
                  <span className="font-semibold">99%</span>
                  <span className="*:size-8">
                    <FontAwesomeIcon icon={faBatteryFull} />
                  </span>
                </p>
              </div>
              <div className="grow  relative">
                <div className="bg-neutral-300 w-10/12 h-4/5" />

                <span className="absolute right-1 top-1 text-blue-700 flex flex-col items-center">
                  Pitch <span className="font-bold">50</span>
                </span>
                <input
                  type={"range"}
                  className="absolute right-5 top-64 w-3/5 rotate-90 origin-right bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-500 h-2"
                />

                <input
                  type={"range"}
                  className="absolute right-10 left-10 bottom-8 w-3/5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-500 h-2"
                />

                <span className="text-blue-700">
                  Roll <span className="font-bold">50</span>
                </span>
                <button className="absolute right-0 bottom-0 font-bold text-neutral-500 py-1 px-2 bg-neutral-300 rounded-lg text-sm">
                  연결 해제
                </button>
              </div>
            </div>
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
