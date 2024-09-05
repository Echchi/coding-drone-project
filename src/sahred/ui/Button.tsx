import {cls} from "../utils/cls.ts";

interface IButtonProps{
    disabled ?: boolean
    onClick : ()=>void
    className?: string
    title : string
}
const Button = ({disabled, onClick, title, className}:IButtonProps) => {
    return (

        <button
            className={cls("w-full py-4 text-2xl font-dunggeunmiso-b bg-amber-500 rounded-lg text-white disabled:bg-neutral-400 shadow-lg disabled:shadow-none hover:bg-amber-500 hover:shadow transition-all",className? className : "")}
            disabled={disabled}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default Button;