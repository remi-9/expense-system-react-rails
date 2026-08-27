import React from "react";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

interface MonthNavigationProps {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}

const MONTHS = [
  { label: "Jan", value: 1 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];

export function MonthNavigation({
  currentMonth,
  currentYear,
  onMonthChange,
}: MonthNavigationProps) {
  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      onMonthChange(12, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onMonthChange(1, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "stretch",
    gap: "12px",
    padding: "8px 0 28px",
    marginBottom: "28px",
  };

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: "0",
    flex: 1,
    borderTop: `2px solid ${COLORS.ink}`,
    borderBottom: `2px solid ${COLORS.ink}`,
  };

  const navigationButtonStyle: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: "16px",
    fontWeight: 600,
    border: `2px solid ${COLORS.ink}`,
    borderRadius: "2px",
    cursor: "pointer",
    background: COLORS.cream,
    color: COLORS.ink,
    minWidth: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FONTS.body,
  };

  const getMonthButtonStyle = (month: number): React.CSSProperties => ({
    padding: "12px 4px",
    fontSize: "13px",
    fontWeight: currentMonth === month ? 700 : 500,
    border: "none",
    borderRight: month === 12 ? "none" : `1px solid ${COLORS.ink}`,
    cursor: "pointer",
    background: currentMonth === month ? COLORS.copper : "transparent",
    color: currentMonth === month ? COLORS.cream : COLORS.ink,
    fontFamily: FONTS.mono,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  });

  return (
    <div style={wrapperStyle}>
      <button
        style={navigationButtonStyle}
        onClick={handlePreviousMonth}
        title="Previous month"
      >
        ←
      </button>
      <div style={containerStyle}>
        {MONTHS.map((month) => (
          <button
            key={month.value}
            style={getMonthButtonStyle(month.value)}
            onClick={() => onMonthChange(month.value, currentYear)}
            onMouseEnter={(e) => {
              if (currentMonth !== month.value) {
                e.currentTarget.style.background = COLORS.secondary.s02;
              }
            }}
            onMouseLeave={(e) => {
              if (currentMonth !== month.value) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {month.label}
          </button>
        ))}
      </div>
      <button
        style={navigationButtonStyle}
        onClick={handleNextMonth}
        title="Next month"
      >
        →
      </button>
    </div>
  );
}
