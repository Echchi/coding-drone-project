"use client";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { cls } from "../utils/cls.ts";
import { faCircleXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      }, 300);
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
    // 모달 닫기 애니메이션이 끝난 후 닫기 처리
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 300); // 애니메이션 시간과 일치하게 설정
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
          className="fixed w-full h-full flex bg-black/70 items-center justify-center z-50"
        >
          <div
            className={cls(
              "pt-2 mx-20 w-full h-[90%] relative rounded-lg overflow-y-auto bg-amber-100 shadow-lg min-h-fit",

              className ? className : "",
            )}
            // style={{ height: "calc(100vh - 3rem)" }}
          >
            <div className="border-t-lg flex justify-between items-center w-full px-6 pt-1">
              <h2 className="text-2xl font-semibold text-lime-700 font-dunggeunmiso-b">
                {title}
              </h2>
              <button
                onClick={(event: React.MouseEvent) => handleClose(event)}
                type="button"
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="size-6 text-lime-600"
                />
              </button>
            </div>
            <div className="rounded-lg my-3 mx-6 p-4 bg-white shadow">
              {content || children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
