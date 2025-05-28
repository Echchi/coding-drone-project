import { useDeactivateLecture } from "./api/useDeactivateLecture.ts";
import { useLecture } from "../../../shared/context/lectureProvider.tsx";
import { useNavigate } from "react-router-dom";

export const useCloseLecture = () => {
  const { mutate } = useDeactivateLecture();
  const { savedLecture } = useLecture();
  const navigate = useNavigate();

  const closeLecture = () => {
    if (savedLecture.lectureId) {
      mutate({ lectureId: savedLecture.lectureId, active: false });
    }
    navigate("/");
  };

  return { closeLecture };
};
