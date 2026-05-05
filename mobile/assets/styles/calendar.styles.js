import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  calendarCard: {
    alignSelf: "center",
    width: "92%",
    maxWidth: 360,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  monthNavButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  monthNavText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  dayHeaderItem: {
    width: 40,
    alignItems: "center",
  },
  dayHeaderText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  dayItem: {
    width: 40,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    position: "relative",
  },
  dayItemSelected: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  dayItemToday: {
    borderColor: COLORS.navy,
    borderWidth: 1.5,
  },
  dayItemPast: {
    opacity: 0.3,
  },
  dayNumber: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  dayNumberSelected: {
    color: COLORS.white,
  },
  dayNumberToday: {
    color: COLORS.textPrimary,
  },
  dayNumberPast: {
    color: COLORS.textSecondary,
  },
  busyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.disabled,
    position: "absolute",
    bottom: 6,
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.navy,
    position: "absolute",
    bottom: 6,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 18,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendDotAvailable: {
    backgroundColor: COLORS.navy,
  },
  legendDotBusy: {
    backgroundColor: COLORS.disabled,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 9999,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
});

export default styles;
