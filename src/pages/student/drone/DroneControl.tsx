import React, { SetStateAction, useState, useRef, useEffect } from "react";
import { cls } from "../../../shared/utils/cls.ts";
import { AnimatePresence, motion } from "framer-motion";
import DroneInfo from "./DroneInfo";

interface IDroneControlProps {
  isOn: boolean;
  setIsOn: React.Dispatch<SetStateAction<boolean>>;
  setBattery: React.Dispatch<SetStateAction<number>>;
  setAttitude: React.Dispatch<SetStateAction<{ roll: number; pitch: number; yaw: number }>>;
  setAltitude: React.Dispatch<SetStateAction<number>>;
  setTemperature: React.Dispatch<SetStateAction<number>>;
  setRangeHeight: React.Dispatch<SetStateAction<number>>;
}

const DroneControl = ({ isOn, setIsOn, setBattery, setAttitude, setAltitude, setTemperature, setRangeHeight }: IDroneControlProps) => {
  const [roll, setRoll] = useState(0);
  const [pitch, setPitch] = useState(0);
  
  // 드론 연결 관리
  const portRef = useRef<SerialPort | null>(null);
  const writerRef = useRef<WritableStreamDefaultWriter | null>(null);
  
  // 드론 제어 명령어
  const droneCommands = {
    takeoff: () => new Uint8Array([0x0A, 0x55, 0x11, 0x02, 0x70, 0x10, 0x07, 0x11, 0xF3, 0xD2]),
    land: () => new Uint8Array([0x0A, 0x55, 0x11, 0x02, 0x70, 0x10, 0x07, 0x12, 0xA7, 0x89]),
    emergency: () => new Uint8Array([0x0A, 0x55, 0x11, 0x02, 0x70, 0x10, 0x07, 0x10, 0xB5, 0x34]),
  };

  // 드론 연결 처리
  const connectDrone = async () => {
    try {
      if (!navigator.serial) throw new Error("이 브라우저는 Web Serial API를 지원하지 않습니다.");
      if (!window.isSecureContext) throw new Error("Web Serial API는 HTTPS 또는 localhost에서만 동작합니다.");
      
      const port = await navigator.serial.requestPort({ filters: [{ usbVendorId: 0x1a86 }] });
      await port.open({ baudRate: 57600 });

      const writer = port.writable?.getWriter();
      portRef.current = port;
      writerRef.current = writer;

      setIsOn(true);
      window.dispatchEvent(new CustomEvent("drone-connection", { detail: { connected: true } }));
    } catch (error) {
      console.error("드론 연결 실패:", error);
      alert(error instanceof Error ? error.message : "드론 연결에 실패했습니다.");
      setIsOn(false);
    }
  };

  // 드론 연결 해제 처리
  const disconnectDrone = async () => {
    try {
      writerRef.current?.close();
      writerRef.current = null;

      portRef.current?.close();
      portRef.current = null;

      setIsOn(false);
      window.dispatchEvent(new CustomEvent("drone-connection", { detail: { connected: false } }));
    } catch (error) {
      console.error("드론 연결 해제 실패:", error);
    }
  };

  // 드론 명령 실행
  const sendDroneCommand = async (command: Uint8Array) => {
    if (writerRef.current) {
      try {
        await writerRef.current.write(command);
      } catch (error) {
        console.error("명령 전송 실패:", error);
      }
    }
  };

  // 이벤트 리스너를 통한 드론 명령 처리
  useEffect(() => {
    const handleDroneCommand = async (event: Event) => {
      if (!isOn) {
        console.error("드론이 연결되어 있지 않습니다.");
        return;
      }

      const { command } = (event as CustomEvent<{ command: string }>).detail;
      switch (command) {
        case "takeoff":
          await sendDroneCommand(droneCommands.takeoff());
          console.log("이륙 명령 전송");
          break;
        case "land":
          await sendDroneCommand(droneCommands.land());
          console.log("착륙 명령 전송");
          break;
        case "emergency":
          await sendDroneCommand(droneCommands.emergency());
          console.log("비상정지 명령 전송");
          break;
      }
    };

    window.addEventListener("drone-command", handleDroneCommand);
    return () => {
      window.removeEventListener("drone-command", handleDroneCommand);
    };
  }, [isOn]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grow flex flex-col relative mt-4">
        <div className="flex relative">
          <div className="w-2/3 flex flex-col">
            <div className="w-8/12 aspect-square p-3 ml-12 relative">
              <img src="/assets/icon/drone.png" alt="drone" className="w-full h-full" />
              <AnimatePresence>
                {!isOn && (
                  <motion.div
                    key={`drone_${isOn}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-0 left-0 w-full bg-neutral-500/50 aspect-square z-10 rounded-lg" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 드론 제어 버튼 */}
        <div className="flex justify-center gap-2">
          <button
            className={cls(
              "font-bold rounded-lg py-[0.5vh] text-lg shadow-lg hover:shadow m-[0.5vh] outline-none",
              isOn ? "bg-neutral-300 text-neutral-500 px-2 hover:bg-neutral-200" : "bg-lime-500 text-white px-3 hover:bg-lime-400"
            )}
            onClick={() => (isOn ? disconnectDrone() : connectDrone())}
          >
            {isOn ? "연결 해제" : "연결"}
          </button>

          {isOn && (
            <>
              <button
                className="font-bold rounded-lg py-[0.5vh] px-3 text-lg shadow-lg hover:shadow m-[0.5vh] outline-none bg-blue-500 text-white hover:bg-blue-400"
                onClick={() => sendDroneCommand(droneCommands.takeoff())}
              >
                이륙
              </button>
              <button
                className="font-bold rounded-lg py-[0.5vh] px-3 text-lg shadow-lg hover:shadow m-[0.5vh] outline-none bg-orange-500 text-white hover:bg-orange-400"
                onClick={() => sendDroneCommand(droneCommands.land())}
              >
                착륙
              </button>
              <button
                className="font-bold rounded-lg py-[0.5vh] px-3 text-lg shadow-lg hover:shadow m-[0.5vh] outline-none bg-red-500 text-white hover:bg-red-400"
                onClick={() => sendDroneCommand(droneCommands.emergency())}
              >
                비상정지
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DroneControl;
