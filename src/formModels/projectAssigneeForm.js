export class ProjectAssigneeForm {
  constructor(projectAssignee) {
    this.userId = projectAssignee?.userId ?? null;
    this.developmentRoleId = projectAssignee?.developmentRoleId ?? null;
    this.active = projectAssignee?.active ?? false;
    this.joinDate = projectAssignee?.joinDate ?? null;
    this.leaveDate = projectAssignee?.leaveDate ?? null;
    this.lockVersion = projectAssignee?.lockVersion ?? null;
  }
}
