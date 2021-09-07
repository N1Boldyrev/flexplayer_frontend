import React, { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import styles from "./styles.module.scss";
import ReactDOM from "react-dom";

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

interface ModalInnerProps {
  children: ReactNode;
  onClose?: () => void;
  setOpen: (val: boolean) => void;
}

const ModalInner = (props: ModalInnerProps) => {
  const { children, onClose, setOpen } = props;

  const modalRef = useRef<null | HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    if (onClose) onClose();
    else setOpen(false);
  }, [onClose, setOpen]);

  const clickAway = useCallback(
    (e: MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        closeModal();
      }
    },
    [closeModal]
  );

  const onEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("click", clickAway);
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("click", clickAway);
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "auto";
    };
  }, [clickAway, onEscape]);

  return (
    <div className={styles.innerWrapper}>
      <div className={styles.modal} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export const Modal = (props: ModalProps) => {
  const { open, children, onClose } = props;

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (open) setOpen(open);
    else setOpen(false);
  }, [open]);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={`${styles.wrapper} ${isOpen && styles.open}`}>
          {isOpen ? (
            <ModalInner setOpen={setOpen} onClose={onClose}>
              {children}
            </ModalInner>
          ) : (
            <></>
          )}
        </div>,
        document.body
      )}
    </>
  );
};
