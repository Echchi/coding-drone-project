import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

const Modal = ({ isOpen, onClose, children, width = "60vh" }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="absolute inset-0 w-full h-full bg-black/80 z-20"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-30 bg-white shadow py-5 rounded-lg flex items-center justify-center font-bold text-xl`}
            style={{
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              width: width,
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
