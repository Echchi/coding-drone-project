import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cls } from "./utils/cls.ts";
import { isInteger } from "lodash";
interface IModal {
  content: string;

  className?: string;
}
const Modal = ({ content, className }: IModal) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (content.length > 0) {
      setIsOpen(true);
    }
  }, [content]);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);
  return (
    <AnimatePresence mode="popLayout">
      {isOpen && (
        <motion.div
          id={`alarm`}
          key={`alarm`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            top: "50%",
            left: "43%",
          }}
          className={cls(
            "fixed z-30 bg-white shadow-xl py-5 rounded-lg flex items-center justify-center w-96",
            className ? className : "font-bold text-xl",
          )}
        >
          <div>{content}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
