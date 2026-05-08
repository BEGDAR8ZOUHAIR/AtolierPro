import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  dateBadge: {
    alignItems: "center",
    width: 48,
  },
  dateBadgeMonth: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.pending,
    textTransform: "uppercase",
  },
  dateBadgeDay: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.pending,
  },
  clientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.placeholderText,
    flex: 1,
    marginLeft: 12,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
  statusBadgeConfirmed: {
    backgroundColor: COLORS.disabled,
  },
  statusBadgePending: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.pending,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statusTextConfirmed: {
    color: COLORS.white,
  },
  statusTextPending: {
    color: COLORS.pending,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: COLORS.placeholderText,
    marginLeft: 6,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.placeholderText,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.placeholderText,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.placeholderText,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.placeholderText,
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.placeholderText,
    fontWeight: "500",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  buttonGhost: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9999,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextGhost: {
    color: COLORS.placeholderText,
    fontWeight: "600",
    fontSize: 14,
  },
  buttonCall: {
    flex: 1,
    backgroundColor: COLORS.navy,
    borderRadius: 9999,
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonTextCall: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
  buttonConfirm: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.pending,
    borderRadius: 9999,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextConfirm: {
    color: COLORS.disabled,
    fontWeight: "600",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
});

export default styles;
