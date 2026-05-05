import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // Light gray gradient-like background matching the design
    backgroundColor: "#EEF0F5",
  },
 
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
 
  // ─── Top section ─────────────────────────────────────────────────
  topSection: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 28,
    // Extra top padding to push content below confetti
    paddingTop: 20,
  },
 
  // ─── Logo (two-block inline logo, small) ─────────────────────────
  logo: {
    flexDirection: "row",
    width: 38,
    height: 38,
    gap: 3,
    marginBottom: 18,
  },
 
  logoLeft: {
    flex: 1,
    backgroundColor: COLORS.navy,   // '#1E2D50'
    borderRadius: 5,
  },
 
  logoRight: {
    flex: 1,
    backgroundColor: COLORS.primary, // '#F97316'
    borderRadius: 5,
    marginTop: 7, // staggered offset
  },
 
  // ─── Title ───────────────────────────────────────────────────────
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: -0.3,
  },
 
  // ─── Subtitle ────────────────────────────────────────────────────
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
 
  // ─── Config card ─────────────────────────────────────────────────
  configCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
    flex: 1,               // fills remaining space so button sits at bottom
    justifyContent: "space-between",
  },
 
  // top part of card (chip + title + rows)
  // (no extra wrapper needed — flex column is default)
 
  // ─── CONFIGURATION chip ──────────────────────────────────────────
  configChip: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 14,
  },
 
  configChipText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6B7280",
    letterSpacing: 1.2,
  },
 
  // ─── Card title ──────────────────────────────────────────────────
  configTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 20,
    letterSpacing: -0.2,
  },
 
  // ─── Rows container ──────────────────────────────────────────────
  rowsContainer: {
    gap: 12,
    flex: 1,
  },
 
  // ─── Each config row (own card) ───────────────────────────────────
  configRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
 
  // ─── Icon box ────────────────────────────────────────────────────
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
 
  // ─── Row text ────────────────────────────────────────────────────
  rowTextContainer: {
    flex: 1,
    gap: 3,
  },
 
  rowTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
 
  rowSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
  },
 
  // ─── CTA button (inside card, bottom) ────────────────────────────
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 9999,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 5,
  },
 
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
 
export default styles;