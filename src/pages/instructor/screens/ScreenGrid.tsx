import React, { useState } from "react";
import { cls } from "../../../sahred/utils/cls.ts";
import ControlButtons from "./ControlButtons.tsx";
import code from "../../student/code/Code.tsx";
import Screen from "./Screen.tsx";
import Modal from "../../../sahred/ui/Modal.tsx";

const ScreenGrid = ({ division }: { division: string }) => {
  return (
    <>
      <div
        className={cls(
          "w-full h-full grid gap-3",
          division === "4x3"
            ? "grid-cols-4 grid-rows-3"
            : division === "4x4"
              ? "grid-cols-4 grid-rows-4"
              : division === "5x4"
                ? "grid-cols-5 grid-rows-4"
                : "grid-cols-4 grid-rows-3",
        )}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <Screen index={index} />
        ))}
      </div>
    </>
  );
};

export default ScreenGrid;
