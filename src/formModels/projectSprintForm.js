export class ProjectSprintForm {
  constructor(projectSprint) {
    this.startDate = projectSprint?.startDate ?? null;
    this.title = projectSprint?.title ?? null;
  }
}
