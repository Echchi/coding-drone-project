import DivWithTitle from "../../ui/DivWithTitle.tsx";

const CodeResult = ({ result }: { result: string }) => {
  return (
    <DivWithTitle
      title={"실행 결과"}
      titleClassName={"bg-lime-500 ring-lime-500"}
      divClassName={"w-full h-1/3 ring-lime-500 font-JetBrains"}
    >
      <div className="w-full h-full bg-transparent p-5 text-lg">{result}</div>
    </DivWithTitle>
  );
};

export default CodeResult;
