export const COLORS = {
  primary: "#F97316", // orange
  navy: "#1E2D50", // logo navy
  textPrimary: "#111827", // headings
  textSecondary: "#374151", // body
  placeholderText: "#9CA3AF", // placeholders
  background: "#F3F4F6", // page background
  cardBackground: "#FFFFFF", // cards white
  inputBackground: "#FFFFFF", // inputs white
  border: "#E5E7EB", // borders
  white: "#ffffff",
  black: "#000000",
  confirmed: "#10B981", // green for confirmed status
  pending: "#F97316", // orange for pending status
  disabled: "#9CA3AF", // gray for disabled
} as const;

export type ColorType = typeof COLORS[keyof typeof COLORS];