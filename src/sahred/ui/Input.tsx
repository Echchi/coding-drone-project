import { cls } from "../utils/cls.ts";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

interface IInputProps {
  name?: string;
  type: string;
  value?: string | string[] | React.ReactElement | null | number;
  placeholder?: string;
  icon?: React.ReactElement;

  errorMessage?: string[] | string;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}
const Input = ({
  type,
  value = "",
  placeholder = "",
  icon,
  errorMessage = [],
  maxLength,
  name = "",
  onChange,
  onBlur,
  isLoading,
}: IInputProps) => {
  return (
    <>
      <div className="relative flex items-center w-full text-lg bg-white group *:transition focus:outline-lime-500 focus:outline-offset-1 rounded-full ring-[2px] ring-lime-500 ">
        <span
          className={cls(
            "absolute inset-y-0 left-6 flex items-center group-focus-within:z-20 *:size-6 text-lime-600",
            errorMessage.length > 0
              ? "*:text-orange-500"
              : "group-focus-within:*:text-lime-600 ",
          )}
        >
          {icon}
        </span>
        <input
          type={type}
          maxLength={maxLength}
          className={cls(
            "rounded-full w-full pl-20 outline-none p-3 group-focus-within:z-10 group-focus-within:outline-none ring group-focus-within:ring-offset-0 group-focus-within:ring-[2px] transition-all bg-white placeholder:text-lg",
            errorMessage.length > 0
              ? "group-focus-within:ring-orange-500 ring-[2px] ring-orange-500"
              : "group-focus-within:ring-lime-500 ring-0",
          )}
          placeholder={placeholder}
          onChange={onChange && ((event) => onChange(event))}
        />
      </div>
      {/*{errorMessage && errorMessage.length > 0 && (*/}
      {/*  <span className="error">{errorMessage}</span>*/}
      {/*)}*/}
    </>
  );
};

export default Input;
