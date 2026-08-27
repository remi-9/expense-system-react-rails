import React from "react";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

interface YearNavigationProps {
  currentYear: number;
  onYearChange: (year: number) => void;
}

export function YearNavigation({
  currentYear,
  onYearChange,
}: YearNavigationProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const buttonStyle: React.CSSProperties = {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: `2px solid ${COLORS.ink}`,
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "16px",
    color: COLORS.ink,
  };

  const yearStyle: React.CSSProperties = {
    fontSize: "42px",
    fontWeight: 700,
    fontFamily: FONTS.display,
    fontStyle: "italic",
    color: COLORS.ink,
    minWidth: "110px",
    textAlign: "center",
    lineHeight: 1,
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={() => onYearChange(currentYear - 1)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = COLORS.secondary.s02;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        ←
      </button>
      <div style={yearStyle}>{currentYear}</div>
      <button
        style={buttonStyle}
        onClick={() => onYearChange(currentYear + 1)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = COLORS.secondary.s02;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        →
      </button>
    </div>
  );
}

export default YearNavigation;
