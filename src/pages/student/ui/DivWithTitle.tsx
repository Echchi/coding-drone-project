import React, { ReactNode } from "react";
import { cls } from "../../../sahred/utils/cls.ts";

interface IDivWithTItle {
  title: string;
  divClassName?: string;
  titleClassName?: string;
  children: ReactNode;
}
const DivWithTitle = ({
  title,
  divClassName,
  titleClassName,
  children,
}: IDivWithTItle) => {
  return (
    <div
      className={cls(
        "bg-white rounded-r-lg rounded-b-lg shadow mt-9 relative ring",
        divClassName ? divClassName : "",
      )}
    >
      <div
        className={cls(
          "absolute w-32 -top-9  rounded-t-lg text-2xl font-dunggeunmiso-b text-white text-center ring",
          titleClassName ? titleClassName : "",
        )}
      >
        {title}
      </div>
      {children}
    </div>
  );
};

export default DivWithTitle;
