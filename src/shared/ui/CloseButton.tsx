import { cls } from "../utils/cls.ts";

interface IButtonProps {
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  title: string;
}
const CloseButton = ({ disabled, onClick, title, className }: IButtonProps) => {
  return (
    <button
      className={cls(
        "w-full py-4 text-2xl bg-rose-500 rounded-lg text-white disabled:bg-neutral-400 shadow-lg disabled:shadow-none hover:bg-rose-400 hover:shadow transition-all",
        className ? className : "",
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CloseButton;
