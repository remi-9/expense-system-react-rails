import React from "react";
import { getCategoryEmoji } from "../constants/categoryEmojis";
import { COLORS } from "../constants/colors";
import { COPY } from "../constants/copy";
import { FONTS, SHADOW } from "../constants/fonts";

interface CategoryData {
  category: string;
  amount: number;
  count: number;
}

interface CategoryBreakdownProps {
  categories: CategoryData[];
  categoryRecords?: Array<{ name: string; emoji?: string | null }>;
  total: number;
  totalCount: number;
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  categories,
  categoryRecords,
  total,
  totalCount,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatTxnCount = (count: number) => {
    return `${count} receipt${count !== 1 ? "s" : ""}`;
  };

  const containerStyle: React.CSSProperties = {
    background: COLORS.cream,
    borderRadius: "2px",
    border: `2px dashed ${COLORS.ink}`,
    boxShadow: SHADOW.stamp,
    overflow: "hidden",
  };

  const totalStyle: React.CSSProperties = {
    padding: "16px 20px",
    display: "flex",
    alignItems: "baseline",
    gap: "16px",
    borderBottom: isCollapsed ? "none" : `2px dashed ${COLORS.ink}`,
    background: COLORS.cream,
    cursor: "pointer",
  };

  const totalLabelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    color: COLORS.ink,
    letterSpacing: "0.16em",
    fontFamily: FONTS.mono,
  };

  const totalAmountStyle: React.CSSProperties = {
    fontSize: "36px",
    fontWeight: 600,
    color: COLORS.copper,
    fontFamily: FONTS.mono,
    letterSpacing: "-0.03em",
  };

  const totalCountStyle: React.CSSProperties = {
    fontSize: "13px",
    color: COLORS.secondary.s08,
    marginLeft: "auto",
    fontFamily: FONTS.display,
    fontStyle: "italic",
  };

  const toggleButtonStyle: React.CSSProperties = {
    width: "28px",
    height: "28px",
    background: "transparent",
    border: `2px solid ${COLORS.ink}`,
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: COLORS.ink,
    transition: "all 0.2s",
    flexShrink: 0,
  };

  const listStyle: React.CSSProperties = {
    padding: "10px 16px 14px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "2px 16px",
  };

  const itemStyle: React.CSSProperties = {
    padding: "8px 4px",
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    minWidth: 0,
    borderBottom: `1px dotted ${COLORS.secondary.s05}`,
  };

  const itemLabelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    minWidth: 0,
    flex: 1,
    fontSize: "14px",
    color: COLORS.ink,
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
    color: COLORS.secondary.s08,
    flexShrink: 0,
    whiteSpace: "nowrap",
    fontFamily: FONTS.display,
    fontStyle: "italic",
  };

  const itemAmountStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 600,
    color: COLORS.ink,
    flexShrink: 0,
    marginLeft: "auto",
    fontFamily: FONTS.mono,
    fontVariantNumeric: "tabular-nums",
  };

  const emptyStyle: React.CSSProperties = {
    padding: "16px 20px 18px",
    fontSize: "16px",
    color: COLORS.secondary.s08,
    fontFamily: FONTS.display,
    fontStyle: "italic",
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
        <span style={totalLabelStyle}>{COPY.totalLabel}:</span>
        <span style={totalAmountStyle}>{formatAmount(total)}</span>
        <span style={totalCountStyle}>({totalCount} receipts)</span>
        <button
          type="button"
          style={toggleButtonStyle}
          aria-label={isCollapsed ? "Expand category breakdown" : "Collapse category breakdown"}
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(!isCollapsed);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.secondary.s02;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
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

      {!isCollapsed &&
        (categories.length === 0 ? (
          <div style={emptyStyle}>{COPY.emptyTally}</div>
        ) : (
          <div style={listStyle} role="list">
            {categories.map((category) => (
              <div key={category.category} style={itemStyle} role="listitem">
                <div style={itemLabelStyle}>
                  <span style={itemEmojiStyle} aria-hidden="true">
                    {getCategoryEmoji(category.category, categoryRecords)}
                  </span>
                  <span style={itemNameStyle}>{category.category}</span>
                  <span style={itemMetaStyle}>
                    · {formatTxnCount(category.count)}
                  </span>
                </div>
                <div style={itemAmountStyle}>
                  {formatAmount(category.amount)}
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default CategoryBreakdown;
