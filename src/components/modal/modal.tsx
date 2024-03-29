"use client";
// Packages
import { ReactNode, useEffect } from "react";
// Imports
import ReactPortal from "@/components/modal/reactportal.modal";
import styles from "@/styles/components/modal.module.scss";

// Modal wraps around Block component rendering the component above channel page

interface IModal {
    children?: ReactNode;
    isOpen?: boolean;
    handleClose: () => void;
};

const Modal = ({ children, isOpen, handleClose }: IModal) => {

    // close modal on escape key press
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    // diable scroll on modal load
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return (): void => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <div className={styles.modal}>
                <div className={styles.modal__content}>{children}</div>
            </div>
        </ReactPortal>
    )
};

export default Modal;