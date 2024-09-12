import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cls } from "../sahred/utils/cls.ts";
import { isInteger } from "lodash";
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
        <motion.div
          key={`notice_${content}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={cls(
            "fixed z-30 bg-white shadow-2xl py-5 rounded-lg flex items-center justify-center w-96",
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
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
