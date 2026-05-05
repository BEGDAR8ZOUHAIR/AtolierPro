import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    marginTop: -24,
  },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  stepCircleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.textSecondary,
  },
  activeStep: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  activeStepText: {
    color: COLORS.white,
  },
  stepLine: {
    flex: 0.3,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },
  formContainer: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputGroupRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  inputGroupHalf: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textPrimary,
  },
  eyeIcon: {
    padding: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  strengthContainer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  strengthBar: {
    flexDirection: "row",
    flex: 1,
    gap: 4,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: "600",
    width: 60,
    textAlign: "right",
  },
  passwordRules: {
    marginTop: 12,
    gap: 4,
  },
  passwordRule: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  passwordRuleMet: {
    fontSize: 12,
    color: COLORS.confirmed,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 9999,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default styles;
