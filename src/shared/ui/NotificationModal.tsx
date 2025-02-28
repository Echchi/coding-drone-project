import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cls } from "../utils/cls.ts";

interface IModal {
  content: string;

  className?: string;
}
const NotificationModal = ({ content, className }: IModal) => {
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
        <>
          <div
            className="fixed !ml-0 inset-0 w-full h-full bg-black/50 rounded-lg flex flex-col justify-center items-center text-white font-bold text-xl z-20"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            key={`notice_${content}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cls(
              "fixed z-30 bg-white shadow-2xl py-12 rounded-lg flex items-center justify-center px-10",
              className ? className : "font-bold text-xl",
            )}
            style={{
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
            }}
          >
            <div>{content}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
