const CodeResult = ({ result }: { result: string }) => {
  return (
    <div className="w-full h-1/3 bg-white rounded-lg shadow ring ring-lime-500 font-JetBrains">
      <div className="w-full h-full bg-transparent p-5 text-lg">{result}</div>
    </div>
  );
};

export default CodeResult;
