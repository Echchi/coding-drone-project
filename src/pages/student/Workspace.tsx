import CodeEditor from "./code/codeEditor/CodeEditor.tsx";
import MainButton from "../../sahred/ui/MainButton.tsx";
import CodeResult from "./code/codeResult/CodeResult.tsx";
import Code from "./code/Code.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull, faMinus } from "@fortawesome/free-solid-svg-icons";
import DroneInfo from "./drone/DroneInfo.tsx";
import DroneControl from "./drone/DroneControl.tsx";
import Drone from "./drone/Drone.tsx";

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
              <Drone />
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
