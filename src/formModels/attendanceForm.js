import filters from "@/utilities/filters";

export class attendanceForm {
  constructor(attendance) {
    this.userId = Number(attendance.userId) || 0;
    this.checkinAt = filters.formatDateHourMinute(attendance.checkinAt) || "";
    this.checkoutAt = filters.formatDateHourMinute(attendance.checkoutAt) || "";
  }
}
