export class ProjectBasicInfoForm {
  constructor(project) {
    this.name = project.name;
    this.description = project.description;
    this.projectPriority = project.projectPriority;
    this.clientId = project.clientId;
    this.state = project.state;
    this.projectType = project.projectType;
    this.sprintDuration = project.sprintDuration;
    this.startedAt = project.startedAt;
    this.endedAt = project.endedAt;
    this.lockVersion = project.lockVersion;
  }
}
