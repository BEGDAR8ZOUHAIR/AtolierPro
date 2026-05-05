import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
 
  scrollView: {
    flex: 1,
  },
 
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
 
  // ─── Back button ────────────────────────────────────────────────
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
 
  // ─── Logo ────────────────────────────────────────────────────────
  logoContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
 
  logoImage: {
    width: 80,
    height: 40,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
  },
 
  // ─── Step indicator ──────────────────────────────────────────────
  stepIndicator: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 28,
  },
 
  stepItem: {
    alignItems: "center",
    gap: 6,
  },
 
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
 
  completedStep: {
    borderColor: COLORS.navy,
    backgroundColor: COLORS.navy,
  },
 
  activeStep: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
 
  activeStepText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.white,
  },
 
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: 6,
    marginTop: 17, // vertically center with circle
  },
 
  stepLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
 
  activeLabelText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
 
  // ─── Terms card ──────────────────────────────────────────────────
  termsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
 
  // ─── Lock icon (inside card) ─────────────────────────────────────
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
 
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(249, 115, 22, 0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
 
  // ─── Card title & subtitle ───────────────────────────────────────
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
 
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 20,
  },
 
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 20,
  },
 
  // ─── Section rows ────────────────────────────────────────────────
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    marginTop: 4,
  },
 
  sectionBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
 
  sectionBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
 
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
 
  paragraph: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 21,
    marginBottom: 18,
  },
 
  // ─── Checkbox ────────────────────────────────────────────────────
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 28,
    gap: 12,
  },
 
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    flexShrink: 0,
  },
 
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
 
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
 
  // ─── Bottom fixed button ─────────────────────────────────────────
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 8,
    backgroundColor: COLORS.background,
  },
 
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 9999,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
 
  buttonDisabled: {
    backgroundColor: "#D1D5DB",
    shadowOpacity: 0,
    elevation: 0,
  },
 
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
 
export default styles;