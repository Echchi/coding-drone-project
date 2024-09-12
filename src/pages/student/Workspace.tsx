import React from "react";
import WorkspaceContent from "./workspaceContent.tsx";

const Workspace = () => {
  return (
    <div
      className="w-full h-full bg-amber-50 rounded-lg shadow flex flex-col pt-3 pb-8 px-8 mx-36"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <p className="w-full text-4xl font-dunggeunmiso-b text-center text-lime-600 py-2">
        코딩 드론 플랫폼
      </p>
      <WorkspaceContent />
    </div>
  );
};

export default Workspace;
