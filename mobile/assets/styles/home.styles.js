// styles/home.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 30,
  },
  appointmentCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 0,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.pending,
  },
  appointmentCardConfirmed: {
    borderLeftColor: COLORS.confirmed,
  },
  dateBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  dateBadgeText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  clientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginVertical: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadgeConfirmed: {
    backgroundColor: COLORS.confirmed,
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
  timeIcon: {
    marginRight: 6,
  },
  timeText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginVertical: 4,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 16,
  },
  buttonGhost: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextGhost: {
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  buttonCall: {
    backgroundColor: COLORS.navy,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextCall: {
    color: COLORS.white,
    fontWeight: "600",
  },
  buttonConfirm: {
    backgroundColor: COLORS.pending,
    borderWidth: 1,
    borderColor: COLORS.pending,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextConfirm: {
    color: COLORS.pending,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 40,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    marginBottom: 16,
    tintColor: COLORS.textSecondary,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});

export default styles;