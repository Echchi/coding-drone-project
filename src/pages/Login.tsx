import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../sahred/ui/Input.tsx";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [codeCheck, setCodeCheck] = useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = useState("");
  const [nickName, setNickName] = useState("");
  const [nickNameErrorMessage, setnickNameErrorMessage] = useState("");
  const handleOnChangeCode = (value: string) => {
    if (value.length === 0) {
      setCodeErrorMessage("");
      setCodeCheck(false);
    }
    debounceCode(value.trim());
  };

  const debounceCode = useMemo(() => {
    return debounce((code: string) => {
      setCode(code);
    }, 500);
  }, []);

  useEffect(() => {
    if (code.length === 0) return;
    if (code === "23899192") {
      localStorage.setItem("role", "student");
      setCodeCheck(true);
      setCodeErrorMessage("");
    } else {
      setCodeErrorMessage("접속 코드를 다시 확인해주세요!");
    }
  }, [code]);

  const handleOnClick = () => {
    if (nickName.length > 0) {
      localStorage.setItem("name", nickName);
      navigate("/workspace");
    }
    setnickNameErrorMessage("이름을 입력해주세요!");
  };

  return (
    <div className="min-w-fit w-1/3 min-h-fit h-1/2 m-auto bg-amber-50 rounded-lg shadow flex flex-col justify-center items-center py-5">
      <p className="w-full text-4xl font-dunggeunmiso-b text-center text-lime-500">
        공통 로그인 폼
      </p>
      <div className="w-2/3 space-y-3">
        <div className="w-full mt-10">
          <Input
            type={"text"}
            maxLength={10}
            icon={<FontAwesomeIcon icon={faLock} />}
            placeholder="접속 코드"
            onChange={(event) => handleOnChangeCode(event.target.value)}
            value={code}
            errorMessage={codeErrorMessage}
          />
        </div>
        <AnimatePresence mode="popLayout">
          {codeCheck && (
            <motion.div
              id={`nickname`}
              key={`nickname`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <Input
                type={"text"}
                maxLength={10}
                icon={<FontAwesomeIcon icon={faUser} />}
                placeholder="이름"
                value={code}
                onChange={(event) => setNickName(event.target.value)}
                errorMessage={nickNameErrorMessage}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="!mt-6 w-full py-4 text-2xl font-dunggeunmiso-b bg-yellow-400 rounded-lg text-white disabled:bg-neutral-400 shadow-lg disabled:shadow-none hover:bg-yellow-300 hover:shadow transition-all"
          disabled={!codeCheck || nickName.length === 0}
          onClick={handleOnClick}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Login;
