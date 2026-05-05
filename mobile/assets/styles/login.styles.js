import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../constants/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.navy, // navy so the status bar area matches
  },

  scrollContent: {
    flexGrow: 1,
  },

  // ─── Navy top section ─────────────────────────────────────────────
  topSection: {
    backgroundColor: COLORS.navy,  // '#1E2D50'
    paddingTop: 60,
    paddingHorizontal: 28,
    // Extra bottom padding to give space for the wave
    paddingBottom: 0,
    position: "relative",
  },

  // ─── Logo (white two-block, top-left) ────────────────────────────
  logo: {
    flexDirection: "row",
    width: 40,
    height: 36,
    gap: 4,
    marginBottom: 20,
  },

  logoBlockLeft: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },

  logoBlockRight: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginTop: 8, // staggered offset
    opacity: 0.85,
  },

  // ─── Tagline ─────────────────────────────────────────────────────
  tagline: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 30,
    marginBottom: 40,
    letterSpacing: -0.3,
  },

  // ─── Wave curve ──────────────────────────────────────────────────
  // Achieved with two absolutely-positioned rounded rectangles
  // that together create the concave wave at the bottom of the navy section
  waveContainer: {
    height: 40,
    flexDirection: "row",
    overflow: "hidden",
  },

  waveLeft: {
    flex: 1,
    backgroundColor: "#F3F4F6", // matches form background
    borderTopRightRadius: 80,
  },

  waveRight: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderTopLeftRadius: 80,
  },

  // ─── Form section ─────────────────────────────────────────────────
  formSection: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },

  // ─── Input group ─────────────────────────────────────────────────
  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    height: 52,
  },

  inputError: {
    borderColor: "#EF4444",
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    height: "100%",
  },

  eyeButton: {
    paddingLeft: 8,
  },

  fieldError: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 5,
  },

  // ─── Forgot password ─────────────────────────────────────────────
  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
    marginTop: -4,
  },

  forgotText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827", // dark, NOT orange — matches design
  },

  // ─── General error ────────────────────────────────────────────────
  generalError: {
    color: "#EF4444",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 16,
  },

  // ─── CTA button ──────────────────────────────────────────────────
  button: {
    backgroundColor: COLORS.primary, // '#F97316'
    borderRadius: 9999,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 4,
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

  // ─── Divider ─────────────────────────────────────────────────────
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  dividerText: {
    paddingHorizontal: 14,
    fontSize: 13,
    color: "#6B7280",
  },

  // ─── Social buttons (icon only, no text) ─────────────────────────
  socialRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 28,
  },

  socialButton: {
    flex: 1,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },

  // Google G — styled with Text since Ionicons doesn't have the colored G
  googleG: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4285F4",   // Google blue
    fontFamily: "System",
  },

  // ─── Footer ──────────────────────────────────────────────────────
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },

  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",  // dark bold — matches design
  },
});

export default styles;