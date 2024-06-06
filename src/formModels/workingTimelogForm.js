export class WorkingTimelogForm {
  constructor(workingTimelog) {
    this.loggedAt = workingTimelog?.loggedAt ?? "";
    this.description = workingTimelog?.description ?? null;
    this.minutes = workingTimelog?.minutes ?? null;
  }
}
