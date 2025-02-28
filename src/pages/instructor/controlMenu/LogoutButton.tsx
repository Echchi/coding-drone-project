import { useState } from "react";

import { useLecture } from "../../../shared/context/lectureProvider.tsx";

const LogoutButton = () => {
  const [isControlOpen, setIsControlOpen] = useState(false);

  const { hasSavedLecture } = useLecture();

  return (
    <>
      {!hasSavedLecture && (
        <button
          className="relative py-3 px-6 font-semibold text-lg bg-rose-500 text-white rounded-xl shadow-lg disabledBtn"
          onClick={() => setIsControlOpen(!isControlOpen)}
          disabled={hasSavedLecture}
        >
          로그아웃
        </button>
      )}
    </>
  );
};

export default LogoutButton;
