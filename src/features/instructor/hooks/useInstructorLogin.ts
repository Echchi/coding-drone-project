import { useState } from "react";
import { useLogin } from "./useLogin.ts";
import { ILoginParams } from "../../../shared/types/instructor.ts";
import { MESSAGES } from "../../../shared/constants/messages.ts";
import { useNavigate } from "react-router-dom";

export const useInstructorLogin = () => {
  const [loginParams, setLoginParams] = useState<ILoginParams>({
    userid: "",
    password: "",
  });
  const [error, setError] = useState("");
  // const [accountCheck, setAccountCheck] = useState(false);
  const { mutate } = useLogin();
  const navigate = useNavigate();
  const handleOnChangeLonginInfo = (
    value: string,
    type: "userid" | "password",
  ) => {
    if (value.length === 0) {
      setError(MESSAGES.AUTH_ERROR.REQUIRED_FIELDS);
    } else {
      setError("");
      setLoginParams((prev) => ({ ...prev, [type]: value }));
    }
  };

  const handleLoginOnClick = () => {
    if (loginParams.userid.length === 0 || loginParams.password.length === 0)
      return;

    mutate(
      { userid: loginParams.userid, password: loginParams.password },
      {
        onSuccess: () => {
          setError("");
          navigate("/control");
        },
        onError: () => {
          setError(MESSAGES.AUTH_ERROR.INVALID_CREDENTIALS);
        },
      },
    );
  };

  return {
    loginParams,
    error,
    handleOnChangeLonginInfo,
    handleLoginOnClick,
  };
};
