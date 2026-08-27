import React, { useEffect } from "react";
import { COLORS } from "../constants/colors";
import { FONTS, SHADOW } from "../constants/fonts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "500px",
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(36, 25, 16, 0.62)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: COLORS.cream,
    borderRadius: "2px",
    padding: "1.75rem",
    maxWidth,
    width: "90%",
    maxHeight: "90vh",
    overflow: "auto",
    border: `2px solid ${COLORS.ink}`,
    boxShadow: SHADOW.stamp,
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "1.5rem",
    borderBottom: `2px solid ${COLORS.ink}`,
    paddingBottom: "0.75rem",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.6rem",
    fontWeight: 700,
    fontFamily: FONTS.display,
    fontStyle: "italic",
    color: COLORS.ink,
  };

  const closeButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    fontSize: "1.75rem",
    cursor: "pointer",
    color: COLORS.ink,
    padding: "0.25rem",
    lineHeight: 1,
    fontFamily: FONTS.display,
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div style={headerStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <button style={closeButtonStyle} onClick={onClose}>
              ×
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
