/**
 * January Ledger
 * Walnut cover, copper ink, ruled paper. Not a dashboard.
 */

const ink = "#1c1610";
const cream = "#f6eedc";
const paper = "#f2e8d0";
const copper = "#c4451c";
const walnut = "#241910";

export const COLORS = {
  cover: walnut,
  cream,
  copper,
  ink,

  primary: {
    p01: "#f8e4d6",
    p02: "#efc4a8",
    p03: "#e39268",
    p04: "#d26538",
    p05: copper,
    p06: "#a83616",
    p07: "#7a2812",
    p08: "#5c1e0e",
    p09: "#3d160c",
    p10: walnut,
  },
  secondary: {
    s01: paper,
    s02: "#eadcbd",
    s03: "#e0d0a8",
    s04: "#d3c3a4",
    s05: "#c4b28e",
    s06: "#a89470",
    s07: "#8a7860",
    s08: "#6b5e4e",
    s09: "#4a4036",
    s10: ink,
  },
  red: {
    re02: "#f3d0c8",
    re04: "#d97868",
    re05: "#9b1d1d",
    re07: "#7a1616",
    re10: "#4a0e0e",
  },
  orange: {
    or02: "#f8e4d6",
    or04: "#e39268",
    or05: copper,
    or07: "#a83616",
    or10: "#5c1e0e",
  },
  yellow: {
    ye02: "#f4e6c4",
    ye04: "#e2c56a",
    ye05: "#c9a227",
    ye07: "#8c7018",
    ye10: "#5a4810",
  },
  yellowGreen: {
    yg02: "#e4ecd4",
    yg04: "#b4c98a",
    yg05: "#6e8c3c",
    yg07: "#4c6428",
    yg10: "#334418",
  },
  green: {
    gr02: "#d5e4d8",
    gr04: "#7eab8a",
    gr05: "#2d5a3d",
    gr07: "#214330",
    gr10: "#162c20",
  },
  blueGreen: {
    bg02: "#d4e4e0",
    bg04: "#7eb0a8",
    bg05: "#2f6b62",
    bg07: "#234e48",
    bg10: "#163430",
  },
  accent: {
    a01: copper,
    a02: "#e39268",
    a03: "#a83616",
  },
  success: "#2d5a3d",
  warning: "#c9a227",
  danger: "#9b1d1d",
  info: "#2f6b62",
  text: {
    primary: ink,
    secondary: "#6b5e4e",
    light: "#8a7860",
  },
  border: "#d3c3a4",
  background: {
    main: cream,
    card: paper,
    hover: "#eadcbd",
  },
} as const;
