export class IssueForm {
  constructor(issue) {
    this.title = issue.title;
    this.description = issue.description;
    this.projectSprintId = issue.projectSprintId;
    this.issueType = issue.issueType;
    this.priority = issue.priority;
    this.issueStatusId = issue.issueStatusId;
    this.startDate = issue.startDate;
    this.deadline = issue.deadline;
    this.issueAssignees = [];

    issue.issueAssignees.forEach((assignee) => {
      this.issueAssignees.push({
        userId: assignee.userId,
        developmentRoleId: assignee.developmentRoleId,
      });
    });
  }
}
