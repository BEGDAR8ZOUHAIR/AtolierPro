import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingTop: 16,
  },
  headerNav: {
    marginRight: 16,
  },
  headerNavText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  dateInfo: {
    marginBottom: 24,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  timeSlot: {
    width: "48%",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  timeSlotSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
  timeSlotTextSelected: {
    color: COLORS.white,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 16,
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
  legendAvailableDot: {
    backgroundColor: COLORS.primary,
  },
  legendBookedDot: {
    backgroundColor: COLORS.disabled,
  },
  legendText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 9999,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 16,
    textAlign: "center",
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
});

export default styles;
