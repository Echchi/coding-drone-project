import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "../../../shared/utils/debounce.ts";
import { useLogin } from "./useLogin.ts";
import login from "../../../pages/login/Login.tsx";
import { ILoginParams } from "../../../shared/types/instructor.ts";

export const useInstructorLogin = () => {
  const [loginParams, setLoginParams] = useState<ILoginParams>({
    userid: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [accountCheck, setAccountCheck] = useState(false);
  const { mutate } = useLogin();
  const handleOnChangeLonginInfo = (
    value: string,
    type: "userid" | "password",
  ) => {
    if (value.length === 0) {
      setError("");
      setAccountCheck(false);
    }
    debounceCode(value.trim(), type);
  };

  const debounceCode = useMemo(() => {
    return debounce((value: string, type: "userid" | "password") => {
      setLoginParams((prev) => ({ ...prev, [type]: value }));
    }, 500);
  }, []);

  useEffect(() => {
    if (loginParams.userid.length === 0 || loginParams.password.length === 0)
      return;
    console.log(loginParams.userid, loginParams.password);
    mutate(
      { userid: loginParams.userid, password: loginParams.password },
      {
        onSuccess: () => {
          setAccountCheck(true);
          setError("");
        },
        onError: () => {
          setError("계정을 확인해주세요");
        },
      },
    );
  }, [loginParams]);

  return {
    loginParams,
    error,
    accountCheck,
    handleOnChangeLonginInfo,
    setError,
    setAccountCheck,
  };
};
