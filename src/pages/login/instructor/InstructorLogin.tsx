import Input from "../../../shared/ui/Input.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MainButton from "../../../shared/ui/MainButton.tsx";
import { useInstructorLogin } from "../../../features/instructor/hooks/useInstructorLogin.ts";

const InstructorLogin = () => {
  const { loginParams, error, handleOnChangeLonginInfo, handleLoginOnClick } =
    useInstructorLogin();

  return (
    <>
      <div className="w-2/3 space-y-3">
        <div className="w-full mt-10 space-y-3">
          <Input
            type={"text"}
            maxLength={10}
            icon={<FontAwesomeIcon icon={faUser} />}
            placeholder="아이디"
            onChange={(event) =>
              handleOnChangeLonginInfo(event.target.value, "userid")
            }
            value={loginParams.userid}
            errorMessage={error}
          />
          <Input
            type={"password"}
            maxLength={10}
            icon={<FontAwesomeIcon icon={faLock} />}
            placeholder="비밀번호"
            onChange={(event) =>
              handleOnChangeLonginInfo(event.target.value, "password")
            }
            value={loginParams.password}
            errorMessage={error}
          />
        </div>

        <MainButton
          title={"로그인"}
          onClick={handleLoginOnClick}
          className={"!mt-6"}
          disabled={
            loginParams.userid.trim().length === 0 ||
            loginParams.password.trim().length === 0
          }
        />
        {error && (
          <p className="text-center text-orange-600 font-semibold text-lg">
            {error}
          </p>
        )}
      </div>
    </>
  );
};

export default InstructorLogin;
