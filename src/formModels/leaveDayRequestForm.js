export class LeaveDayRequestForm {
  constructor(leaveDayRequest) {
    // this.id = leaveDayRequest?.id ?? null;
    this.requestType = leaveDayRequest?.requestType ?? null;
    this.from = leaveDayRequest?.from ?? null;
    this.to = leaveDayRequest?.to ?? null;
    this.timeOff = leaveDayRequest?.timeOff ?? 0;
    this.reason = leaveDayRequest?.reason ?? null;
    this.lockVersion = leaveDayRequest?.lockVersion ?? null;
  }
}
