import { storeToRefs } from "pinia";
import { useProjectIssueStore } from "@/stores/projectIssue";

export default function useDragging() {
  const projectIssueStore = useProjectIssueStore();
  const { isDraggingIssue, isDraggingSprintIssue, draggableSprint } =
    storeToRefs(projectIssueStore);

  function toggleDragging(sprintId) {
    if (sprintId) isDraggingIssue.value = !isDraggingIssue.value;
    isDraggingSprintIssue.value = !isDraggingSprintIssue.value;
    draggableSprint.value = sprintId;
  }

  return {
    toggleDragging,
  };
}
