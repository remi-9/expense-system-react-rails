import React from "react";
import { COLORS } from "../constants/colors";
import { FONTS, SHADOW } from "../constants/fonts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: COLORS.copper,
          color: COLORS.cream,
          border: `2px solid ${COLORS.ink}`,
        };
      case "secondary":
        return {
          backgroundColor: COLORS.cream,
          color: COLORS.ink,
          border: `2px solid ${COLORS.ink}`,
        };
      case "danger":
        return {
          backgroundColor: COLORS.danger,
          color: COLORS.cream,
          border: `2px solid ${COLORS.ink}`,
        };
      case "success":
        return {
          backgroundColor: COLORS.success,
          color: COLORS.cream,
          border: `2px solid ${COLORS.ink}`,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { padding: "0.3rem 0.7rem", fontSize: "0.8rem" };
      case "medium":
        return { padding: "0.55rem 1.05rem", fontSize: "0.95rem" };
      case "large":
        return { padding: "0.75rem 1.4rem", fontSize: "1.05rem" };
    }
  };

  const styles: React.CSSProperties = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    width: fullWidth ? "100%" : "auto",
    borderRadius: "2px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    fontWeight: 600,
    fontFamily: FONTS.body,
    letterSpacing: "0.02em",
    boxShadow: disabled ? "none" : SHADOW.stamp,
    transition: "transform 0.12s ease, box-shadow 0.12s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  };

  return (
    <button
      style={styles}
      disabled={disabled}
      {...props}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translate(2px, 2px)";
          e.currentTarget.style.boxShadow = SHADOW.stampHover;
        }
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0, 0)";
        e.currentTarget.style.boxShadow = disabled ? "none" : SHADOW.stamp;
        props.onMouseLeave?.(e);
      }}
    >
      {children}
    </button>
  );
}
