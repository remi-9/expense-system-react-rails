/**
 * Reusable ItemTable component
 */

import React from "react";
import { COLORS } from "../constants/colors";
import { FONTS, SHADOW } from "../constants/fonts";

interface Column {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  width?: string;
  render?: (item: any) => React.ReactNode;
}

interface ItemTableProps {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
}

export function ItemTable({
  columns,
  data,
  emptyMessage = "No data available",
}: ItemTableProps) {
  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: COLORS.cream,
    borderRadius: "2px",
    overflow: "hidden",
    border: `2px solid ${COLORS.ink}`,
    boxShadow: SHADOW.stamp,
  };

  const theadStyle: React.CSSProperties = {
    backgroundColor: COLORS.secondary.s01,
  };

  const thStyle: React.CSSProperties = {
    padding: "0.85rem 0.9rem",
    textAlign: "left",
    fontWeight: 600,
    color: COLORS.ink,
    borderBottom: `2px solid ${COLORS.ink}`,
    fontFamily: FONTS.mono,
    fontSize: "0.72rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  };

  const tdStyle: React.CSSProperties = {
    padding: "0.85rem 0.9rem",
    borderBottom: `1px solid ${COLORS.secondary.s04}`,
    color: COLORS.ink,
  };

  const emptyStyle: React.CSSProperties = {
    padding: "2.5rem 1.5rem",
    textAlign: "center",
    color: COLORS.secondary.s08,
    fontFamily: FONTS.display,
    fontStyle: "italic",
    fontSize: "1.15rem",
  };

  if (data.length === 0) {
    return (
      <div style={tableStyle}>
        <div style={emptyStyle}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <table style={tableStyle}>
      <thead style={theadStyle}>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              style={{
                ...thStyle,
                textAlign: column.align || "left",
                width: column.width,
              }}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td
                key={column.key}
                style={{
                  ...tdStyle,
                  textAlign: column.align || "left",
                }}
              >
                {column.render
                  ? column.render(item)
                  : (item[column.key] ?? "-")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
