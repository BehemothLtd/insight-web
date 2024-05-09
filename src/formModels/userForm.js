import filters from "@/utilities/filters.js";

export class UserForm {
  constructor(user) {
    this.email = user?.email ?? "";
    this.fullName = user?.fullName ?? "";
    this.name = user?.name ?? "";
    this.about = user?.about ?? "";
    this.avatarUrl = user?.avatarUrl ?? "";
    this.createdAt = user?.createdAt ?? "";
    this.companyLevelId = user?.companyLevelId ?? null;
    this.state = user?.state ?? null;
    this.address = user?.address ?? null;
    this.birthday = filters.formatDate(user?.birthday) ?? null;
    this.gender = user?.gender ?? null;
    this.phone = user?.phone ?? null;
    this.timingActiveAt = user?.timingActiveAt ?? null;
    this.timingDeactiveAt = user?.timingDeactiveAt ?? null;
    this.slackId = user?.slackId ?? "";
    this.projectAssignees = user?.projectAssignees ?? null;
  }
}
