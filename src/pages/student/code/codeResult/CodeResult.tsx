import React from "react";
import { motion } from "framer-motion";
import DivWithTitle from "../../../../shared/ui/DivWithTitle.tsx";

const CodeResult = ({ result }: { result: string }) => {
  // 결과 문자열에 줄바꿈이 있는지 확인하고 처리
  const formattedResult = result.split("\n").map((line, index) => (
    <div key={index} className="mb-1">
      {line}
    </div>
  ));

  return (
    <DivWithTitle
      title={"실행 결과"}
      titleClassName={"bg-lime-500 ring-lime-500"}
      divClassName={"w-full h-1/4 ring-lime-500 font-JetBrains"}
    >
      <div className="w-full h-full bg-transparent p-5 text-lg overflow-y-auto whitespace-pre-line">
        {formattedResult}
      </div>
    </DivWithTitle>
  );
};

export default CodeResult;
