import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  flex: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  // ─── Back button ─────────────────────────────────────────────────
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  // ─── Logo ─────────────────────────────────────────────────────────
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  logoImage: {
    width: 48,
    height: 48,
  },

  // ─── Top subtitle ─────────────────────────────────────────────────
  topSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
  },

  // ─── Step indicator ───────────────────────────────────────────────
  stepIndicator: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 32,
  },

  stepItem: {
    alignItems: "center",
    gap: 6,
  },

  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  activeStep: {
    borderColor: "#F97316",
    backgroundColor: "#F97316",
  },

  stepCircleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
  },

  activeStepText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  stepLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 8,
    marginTop: 17, // centers with circle
  },

  stepLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "500",
  },

  activeLabelText: {
    color: "#F97316",
    fontWeight: "700",
  },

  // ─── Input group ──────────────────────────────────────────────────
  inputGroup: {
    marginBottom: 16,
  },

  // Label row: label text + red asterisk inline
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",   // gray label — matches design exactly
  },

  required: {
    fontSize: 13,
    color: "#EF4444",   // red asterisk
    fontWeight: "500",
  },

  // ─── Input (no icons, plain white card) ───────────────────────────
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 52,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111827",
  },

  // ─── Code postal + Ville row ──────────────────────────────────────
  rowGroup: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  halfGroup: {
    flex: 1,
  },

  // ─── Password field (eye icon on right) ───────────────────────────
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 52,
    paddingHorizontal: 16,
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    height: "100%",
  },

  eyeButton: {
    paddingLeft: 8,
  },

  // ─── Strength bar ─────────────────────────────────────────────────
  // Single continuous bar — "Faible" left, "sécurisé" right
  strengthRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },

  strengthLabelLeft: {
    fontSize: 11,
    color: "#9CA3AF",
    width: 36,
  },

  strengthTrack: {
    flex: 1,
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
  },

  strengthFill: {
    height: "100%",
    backgroundColor: "#1E2D50",  // dark navy fill — matches design's dark bar
    borderRadius: 3,
  },

  strengthFillStrong: {
    backgroundColor: "#10B981",  // green when strong
  },

  strengthLabelRight: {
    fontSize: 11,
    color: "#9CA3AF",
    width: 48,
    textAlign: "right",
  },

  // ─── CTA Button ───────────────────────────────────────────────────
  button: {
    backgroundColor: "#F97316",
    borderRadius: 9999,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 4,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 5,
  },

  buttonDisabled: {
    backgroundColor: "#D1D5DB",
    shadowOpacity: 0,
    elevation: 0,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  // ─── Footer ───────────────────────────────────────────────────────
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },

  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F97316",  // orange — "Me connecter"
  },
});

export default styles;