import { COLORS } from "@/styles/colors";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CELL_SIZE = Math.floor((width - 48 - 32) / 7); // 7 cols, card padding 16*2, screen padding 16*2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  // ─── Header ──────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },

  headerLogo: {
    width: 38,
    height: 38,
  },

  // ─── Screen title ─────────────────────────────────────────────────
  screenTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    letterSpacing: -0.3,
  },

  // ─── Toggle ───────────────────────────────────────────────────────
  toggleWrap: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 9999,
    padding: 4,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  toggleBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 9999,
  },

  toggleBtnActive: {
    backgroundColor: "#F97316",
  },

  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },

  toggleTextActive: {
    color: "#FFFFFF",
  },

  // ─── List ─────────────────────────────────────────────────────────
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  // ─── Card ─────────────────────────────────────────────────────────
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: "row",
  },

  cardPending: {
    // pending cards show orange left border accent via pendingAccent view
  },

  cardInModal: {
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },

  // Orange left accent bar (pending only)
  pendingAccent: {
    width: 4,
    backgroundColor: "#F97316",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },

  cardInner: {
    flex: 1,
    padding: 16,
  },

  // ─── Card top row ─────────────────────────────────────────────────
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 10,
  },

  dateBadge: {
    alignItems: "center",
    width: 44,
  },

  dateBadgeMonth: {
    fontSize: 10,
    fontWeight: "700",
    color: "#F97316",
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  dateBadgeDayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1E2D50",
    alignItems: "center",
    justifyContent: "center",
  },

  dateBadgeDayText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  cardMeta: {
    flex: 1,
  },

  clientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  timeText: {
    fontSize: 13,
    color: "#6B7280",
  },

  // Status badges
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    alignSelf: "flex-start",
  },

  statusConfirmed: {
    backgroundColor: COLORS.confirmed,
  },

  statusPending: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.pending,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  statusTextConfirmed: {
    color: "#FFFFFF",
  },

  statusTextPending: {
    color: COLORS.pending,
  },

  // ─── Divider ──────────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },

  // ─── Service + address ────────────────────────────────────────────
  serviceText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },

  addressText: {
    fontSize: 13,
    color: COLORS.placeholderText,
    marginBottom: 14,
  },

  // ─── Buttons ──────────────────────────────────────────────────────
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
  },

  btnDetails: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.background,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },

  btnDetailsText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.navy,
  },

  btnCall: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.navy,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  btnCallText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },

  btnConfirm: {
    flex: 1,
    height: 44,
    backgroundColor: 'transparent',
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
  },

  btnConfirmText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.orange,
  },

  // ─── Empty state ──────────────────────────────────────────────────
  emptyWrap: {
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 16,
    marginBottom: 6,
  },

  emptySubtitle: {
    fontSize: 14,
    color: COLORS.placeholderText,
    textAlign: "center",
    lineHeight: 20,
  },

  // ─── FAB ──────────────────────────────────────────────────────────
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.pending,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.pending,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  // ─── Calendar ─────────────────────────────────────────────────────
  calendarScroll: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Month nav — white rounded pill
  monthNavContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  monthNavSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minWidth: 60,
  },

  monthNavSideRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minWidth: 60,
    justifyContent: "flex-end",
  },

  monthNavSideText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.placeholderText,
    letterSpacing: 0.5,
  },

  monthNavCenter: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.placeholderText,
  },

  // Calendar card
  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  daysHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },

  dayHeaderText: {
    width: CELL_SIZE,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 0.3,
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  calCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },

  calDayInner: {
    width: CELL_SIZE - 4,
    height: CELL_SIZE - 4,
    borderRadius: (CELL_SIZE - 4) / 2,
    alignItems: "center",
    justifyContent: "center",
  },

  calDayWithAppts: {
    backgroundColor: COLORS.pending,
  },

  calDayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },

  calDayTextWithAppts: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  calDayTextToday: {
    fontWeight: "700",
    color: "#111827",
  },

  calDayOther: {
    fontSize: 13,
    color: "#D1D5DB",
  },

  // Today underline (instead of border circle)
  todayUnderline: {
    position: "absolute",
    bottom: 2,
    width: 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#111827",
  },

  // ─── Modal bottom sheet ───────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalSheet: {
    backgroundColor: "#F3F4F6",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 40,
    maxHeight: "80%",
  },

  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
    alignSelf: "center",
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    textTransform: "capitalize",
  },
});

export default styles;