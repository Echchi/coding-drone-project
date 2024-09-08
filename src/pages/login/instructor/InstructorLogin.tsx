import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import Input from "../../../sahred/ui/Input.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { AnimatePresence, motion } from "framer-motion";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MainButton from "../../../sahred/ui/MainButton.tsx";

const InstructorLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [accountCheck, setAccountCheck] = useState(false);

  const handleOnChangeLonginInfo = (value: string, type: "id" | "password") => {
    if (value.length === 0) {
      setError("");
      setAccountCheck(false);
    }
    debounceCode(value.trim(), type);
  };

  const debounceCode = useMemo(() => {
    return debounce((value: string, type: "id" | "password") => {
      setForm((prev) => ({ ...prev, [type]: value }));
    }, 500);
  }, []);

  useEffect(() => {
    if (form.id.length === 0 || form.password.length === 0) return;
    if (form.id === "test" && form.password === "password") {
      localStorage.setItem("role", "instructor");
      setAccountCheck(true);
      setError("");
    } else {
      setError("계정을 확인해주세요");
    }
  }, [form]);

  const handleLoginOnClick = () => {
    if (accountCheck) {
      localStorage.setItem("name", "강사");
      navigate("/control");
    }
  };

  return (
    <div className="w-2/3 space-y-3">
      <div className="w-full mt-10 space-y-3">
        <Input
          type={"text"}
          maxLength={10}
          icon={<FontAwesomeIcon icon={faUser} />}
          placeholder="아이디"
          onChange={(event) =>
            handleOnChangeLonginInfo(event.target.value, "id")
          }
          value={form.id}
          errorMessage={error}
        />
        <Input
          type={"text"}
          maxLength={10}
          icon={<FontAwesomeIcon icon={faLock} />}
          placeholder="비밀번호"
          onChange={(event) =>
            handleOnChangeLonginInfo(event.target.value, "password")
          }
          value={form.password}
          errorMessage={error}
        />
      </div>

      <MainButton
        title={"로그인"}
        onClick={handleLoginOnClick}
        className={"!mt-6"}
        disabled={
          !accountCheck ||
          form.id.trim().length === 0 ||
          form.password.trim().length === 0
        }
      />
    </div>
  );
};

export default InstructorLogin;
