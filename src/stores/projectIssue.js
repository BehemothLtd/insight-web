import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectIssueStore = defineStore("project/issue", () => {
  const isDraggingIssue = ref(false);
  const isDraggingSprintIssue = ref(false);
  const draggableSprint = ref(null);

  return {
    isDraggingIssue,
    isDraggingSprintIssue,
    draggableSprint,
  };
});
