/**
 * Reusable SelectBox component
 */

import React from "react";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
}

export function SelectBox({
  label,
  error,
  fullWidth = false,
  placeholder = "Select...",
  options,
  ...props
}: SelectBoxProps) {
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

  const selectStyle: React.CSSProperties = {
    padding: "0.55rem 0.7rem",
    fontSize: "1rem",
    border: `2px solid ${error ? COLORS.danger : COLORS.ink}`,
    borderRadius: "2px",
    outline: "none",
    backgroundColor: COLORS.cream,
    color: COLORS.text.primary,
    cursor: "pointer",
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
      <select style={selectStyle} {...props}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}
