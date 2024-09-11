"use client";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { cls } from "../utils/cls.ts";

interface ModalProps {
  title: string;
  content?: React.ReactElement;
  children?: React.ReactElement;
  onClose: () => void;
  className?: string;
}

const Modal = ({
  title,
  content,
  onClose,
  className,
  children,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(true); // 모달 상태 관리

  const [isMouseDownOnBackdrop, setIsMouseDownOnBackdrop] = useState(false); // 백드롭에서 mousedown 이벤트가 발생했는지 추적

  const handleBackgroundMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMouseDownOnBackdrop(true);
    }
  };

  const handleBackgroundMouseUp = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isMouseDownOnBackdrop) {
      setTimeout(() => {
        setIsOpen(false);

        onClose();
      }, 200);
    }
    setIsMouseDownOnBackdrop(false);
  };

  const handleMouseUp = () => {
    setIsMouseDownOnBackdrop(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = (event: React.MouseEvent) => {
    // event.preventDefault();

    setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={handleBackgroundMouseDown}
          onMouseUp={handleBackgroundMouseUp}
          className="fixed w-full h-full flex !bg-yellow-400 items-center justify-center z-50"
        >
          <div
            className={cls(
              "bg-white p-4 w-1/2 min-h-fit relative rounded-lg overflow-y-auto bg-pink-600",
              className ? className : "",
            )}
          >
            <button
              data-testid={"close-button"}
              onClick={(event: React.MouseEvent) => handleClose(event)}
              className="absolute top-4 right-4 text-2xl"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold">{title}</h2>

            <div>{content || children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
