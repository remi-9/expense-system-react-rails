import React from "react";
import { COLORS } from "../constants/colors";
import { COPY } from "../constants/copy";
import { FONTS } from "../constants/fonts";

interface SidebarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onNavigate,
  currentPage = "history",
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? "88px" : "300px",
    height: "100vh",
    background: `linear-gradient(165deg, #2e2118 0%, ${COLORS.cover} 55%, #1a120c 100%)`,
    display: "flex",
    flexDirection: "column",
    borderRight: `8px solid ${COLORS.copper}`,
    position: "fixed",
    left: 0,
    top: 0,
    transition: "width 0.2s ease",
    color: COLORS.cream,
  };

  const headerStyle: React.CSSProperties = {
    padding: isCollapsed ? "28px 12px" : "32px 20px 24px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "8px",
  };

  const logoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    minWidth: 0,
  };

  const logoIconStyle: React.CSSProperties = {
    width: "52px",
    height: "52px",
    background: COLORS.copper,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: 700,
    color: COLORS.cream,
    fontFamily: FONTS.display,
    flexShrink: 0,
    boxShadow: "inset 0 0 0 3px rgba(246, 238, 220, 0.25)",
  };

  const logoTextStyle: React.CSSProperties = {
    display: isCollapsed ? "none" : "flex",
    flexDirection: "column",
    minWidth: 0,
  };

  const logoTitleStyle: React.CSSProperties = {
    fontSize: "22px",
    fontWeight: 700,
    fontFamily: FONTS.display,
    fontStyle: "italic",
    color: COLORS.cream,
    lineHeight: 1.15,
  };

  const logoTaglineStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 500,
    fontStyle: "italic",
    fontFamily: FONTS.display,
    color: COLORS.primary.p03,
    marginTop: "6px",
  };

  const toggleButtonStyle: React.CSSProperties = {
    width: "36px",
    height: "36px",
    background: "transparent",
    border: `1px solid ${COLORS.primary.p03}`,
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    marginTop: "8px",
  };

  const navStyle: React.CSSProperties = {
    flex: 1,
    padding: "8px 12px",
  };

  const navItemStyle: React.CSSProperties = {
    width: "100%",
    padding: isCollapsed ? "14px" : "14px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: isCollapsed ? "center" : "flex-start",
    gap: "14px",
    background:
      currentPage === "history" ? "rgba(246, 238, 220, 0.08)" : "transparent",
    border: "none",
    borderLeft:
      currentPage === "history"
        ? `3px solid ${COLORS.copper}`
        : "3px solid transparent",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: FONTS.display,
    fontStyle: "italic",
    color: COLORS.cream,
    textAlign: "left",
    transition: "background 0.2s",
  };

  const navTextStyle: React.CSSProperties = {
    display: isCollapsed ? "none" : "inline",
  };

  const spineStyle: React.CSSProperties = {
    display: isCollapsed ? "none" : "block",
    padding: "20px",
    fontFamily: FONTS.mono,
    fontSize: "11px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: COLORS.primary.p03,
  };

  return (
    <aside style={sidebarStyle}>
      <div style={headerStyle}>
        <div style={logoStyle}>
          <span style={logoIconStyle}>$</span>
          <div style={logoTextStyle}>
            <div style={logoTitleStyle}>{COPY.appName}</div>
            <div style={logoTaglineStyle}>{COPY.tagline}</div>
          </div>
        </div>
        <button
          style={toggleButtonStyle}
          aria-label="Toggle sidebar"
          onClick={onToggleCollapse}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.cream}
            strokeWidth="2"
            style={{
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <nav style={navStyle}>
        <button
          style={navItemStyle}
          onClick={() => onNavigate?.("history")}
          onMouseEnter={(e) => {
            if (currentPage !== "history") {
              e.currentTarget.style.background = "rgba(246, 238, 220, 0.06)";
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== "history") {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="1" ry="1" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span style={navTextStyle}>{COPY.navHistory}</span>
        </button>
      </nav>

      <div style={spineStyle}>Vol. I · Personal ledger</div>
    </aside>
  );
};

export default Sidebar;
