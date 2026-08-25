import React from "react";
import { CATEGORY_EMOJIS } from "../constants/categoryEmojis";
import { COLORS } from "../constants/colors";

interface CategoryData {
  category: string;
  amount: number;
  count: number;
}

interface CategoryBreakdownProps {
  categories: CategoryData[];
  total: number;
  totalCount: number;
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  categories,
  total,
  totalCount,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatTxnCount = (count: number) => {
    return `${count} txn${count !== 1 ? "s" : ""}`;
  };

  const containerStyle: React.CSSProperties = {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  };

  const totalStyle: React.CSSProperties = {
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: isCollapsed ? "none" : `1px solid ${COLORS.secondary.s04}`,
    background: COLORS.secondary.s01,
    cursor: "pointer",
  };

  const totalLabelStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 600,
    color: COLORS.secondary.s08,
    letterSpacing: "0.05em",
  };

  const totalAmountStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: 700,
    color: COLORS.secondary.s10,
  };

  const totalCountStyle: React.CSSProperties = {
    fontSize: "14px",
    color: COLORS.secondary.s07,
    marginLeft: "auto",
  };

  const toggleButtonStyle: React.CSSProperties = {
    width: "28px",
    height: "28px",
    background: COLORS.secondary.s03,
    border: "none",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: COLORS.secondary.s08,
    transition: "all 0.2s",
    flexShrink: 0,
  };

  const listStyle: React.CSSProperties = {
    padding: "8px 12px 12px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "2px 16px",
  };

  const itemStyle: React.CSSProperties = {
    padding: "6px 4px",
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    minWidth: 0,
  };

  const itemLabelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    minWidth: 0,
    flex: 1,
    fontSize: "14px",
    color: COLORS.secondary.s10,
  };

  const itemEmojiStyle: React.CSSProperties = {
    fontSize: "14px",
    lineHeight: 1,
    flexShrink: 0,
  };

  const itemNameStyle: React.CSSProperties = {
    fontWeight: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const itemMetaStyle: React.CSSProperties = {
    color: COLORS.secondary.s07,
    flexShrink: 0,
    whiteSpace: "nowrap",
  };

  const itemAmountStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 700,
    color: COLORS.secondary.s10,
    flexShrink: 0,
    marginLeft: "auto",
    fontVariantNumeric: "tabular-nums",
  };

  return (
    <div style={containerStyle}>
      <div
        style={totalStyle}
        onClick={() => setIsCollapsed(!isCollapsed)}
        role="button"
        tabIndex={0}
        aria-expanded={!isCollapsed}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsCollapsed(!isCollapsed);
          }
        }}
      >
        <span style={totalLabelStyle}>TOTAL:</span>
        <span style={totalAmountStyle}>{formatAmount(total)}</span>
        <span style={totalCountStyle}>({totalCount} transactions)</span>
        <button
          type="button"
          style={toggleButtonStyle}
          aria-label={isCollapsed ? "Expand category breakdown" : "Collapse category breakdown"}
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(!isCollapsed);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.secondary.s04;
            e.currentTarget.style.color = COLORS.secondary.s10;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = COLORS.secondary.s03;
            e.currentTarget.style.color = COLORS.secondary.s08;
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <path d="M8 11l-5-5h10z" />
          </svg>
        </button>
      </div>

      {!isCollapsed && (
        <div style={listStyle} role="list">
          {categories.map((category) => (
            <div key={category.category} style={itemStyle} role="listitem">
              <div style={itemLabelStyle}>
                <span style={itemEmojiStyle} aria-hidden="true">
                  {CATEGORY_EMOJIS[category.category] || "📊"}
                </span>
                <span style={itemNameStyle}>{category.category}</span>
                <span style={itemMetaStyle}>
                  · {formatTxnCount(category.count)}
                </span>
              </div>
              <div style={itemAmountStyle}>{formatAmount(category.amount)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBreakdown;
