import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../sahred/ui/Input.tsx";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../sahred/ui/Button.tsx";
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "",
    nickName: "",
  });
  const [errors, setErrors] = useState({
    code: "",
    nickName: "",
  });
  const [codeCheck, setCodeCheck] = useState(false);

  const handleOnChangeCode = (value: string) => {
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, code: "" }));
      setCodeCheck(false);
    }
    debounceCode(value.trim());
  };

  const debounceCode = useMemo(() => {
    return debounce((code: string) => {
     setForm((prev)=>({...prev,code}))
    }, 500);
  }, []);

  useEffect(() => {
    if (form.code.length === 0) return;
    if (form.code === "23899192") {
      localStorage.setItem("role", "student");
      setCodeCheck(true);
      setErrors((prev) => ({ ...prev, code: "" }));
    } else {
      setErrors((prev) => ({ ...prev, code: "접속 코드를 다시 확인해주세요!" }));
    }
  }, [form.code]);

  const handleOnClick = () => {
    if (form.nickName.trim().length > 0) {
      localStorage.setItem("name", form.nickName.trim());
      navigate("/workspace");
    } else {
      setErrors((prev) => ({ ...prev, nickName: "이름을 입력해주세요!" }));
    }
  }

  return (
    <div className="min-w-fit w-1/3 min-h-fit h-1/2 m-auto bg-amber-50 rounded-lg shadow flex flex-col justify-center items-center py-5">
      <p className="w-full text-4xl font-dunggeunmiso-b text-center text-lime-600">
        코딩 드론 플랫폼
      </p>
      <div className="w-2/3 space-y-3">
        <div className="w-full mt-10">
          <Input
            type={"text"}
            maxLength={10}
            icon={<FontAwesomeIcon icon={faLock} />}
            placeholder="접속 코드"
            onChange={(event) => handleOnChangeCode(event.target.value)}
            value={form.code}
            errorMessage={errors.code}
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
                value={form.nickName}
                onChange={(event) =>
                    setForm((prev) => ({ ...prev, nickName: event.target.value }))
                }
                errorMessage={errors.nickName}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Button title={"시작하기"} onClick={handleOnClick} className={"!mt-6"} disabled={!codeCheck || form.nickName.trim().length === 0}/>
      </div>
      <button className="">강사 로그인</button>
    </div>
  );
};

export default Login;
