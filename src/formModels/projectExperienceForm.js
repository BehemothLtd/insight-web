export class projectExperienceForm {
  constructor(pe) {
    this.projectId = Number(pe.projectId) || 0;
    this.title = pe.title || "";
    this.description = pe.description || "";
  }
}
