import React, { useState, useEffect, useRef } from "react";
import DivWithTitle from "../../../shared/ui/DivWithTitle.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  return (
    <div className="flex flex-col h-full">
      <DivWithTitle
        title={"질문하기"}
        titleClassName={"bg-rose-500 ring-rose-500"}
        divClassName={"w-full h-full ring-rose-500 flex flex-col"}
      >
        <div className="flex-1 relative rounded-b-lg py-2">
          <div className="h-full max-h-full w-full pt-3 pb-12 px-2 flex flex-col space-y-2 *:py-2 *:px-3 *:w-fit *:font-semibold *:rounded-full odd:self-end overflow-y-auto">
            <div className="rounded-lg bg-rose-100 self-end">선생님 질문있습니다</div>
            <div className="rounded-lg bg-neutral-100">말씀하세요</div>
          </div>
          <div className="flex w-[96%] absolute bottom-0 h-10 rounded-full bg-rose-100 mb-1 right-1.5 left-1.5">
            <textarea className="bg-transparent w-full h-full rounded-bl-lg outline-none pt-1.5 pl-4 pr-0 resize-none" />
            <button className="rounded-full bg-red-500 w-12 h-8 m-1 text-white">
              <FontAwesomeIcon icon={faPaperPlane} className="size-4" />
            </button>
          </div>
        </div>
      </DivWithTitle>
    </div>
  );
};

export default Chat;
