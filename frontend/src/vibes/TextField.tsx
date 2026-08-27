/**
 * Reusable TextField component
 */

import React from "react";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function TextField({
  label,
  error,
  fullWidth = false,
  ...props
}: TextFieldProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: fullWidth ? "100%" : "auto",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: COLORS.text.primary,
    fontFamily: FONTS.mono,
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.55rem 0.7rem",
    fontSize: "1rem",
    border: `2px solid ${error ? COLORS.danger : COLORS.ink}`,
    borderRadius: "2px",
    outline: "none",
    backgroundColor: COLORS.cream,
    color: COLORS.text.primary,
    fontFamily: FONTS.body,
  };

  const errorStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: COLORS.danger,
    marginTop: "-0.25rem",
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input style={inputStyle} {...props} />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}
