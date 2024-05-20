import { defineStore } from "pinia";
import { ref } from "vue";

import { FetchIssue } from "@/apis/repositories";

export const useIssueModalStore = defineStore("issueModal", () => {
  const issueModal = ref(false);
  const issue = ref({});
  const modalTitle = ref("");

  function showIssueModal() {
    issueModal.value = true;
  }

  function hideIssueModal() {
    issueModal.value = false;
  }

  async function editIssue(projectId, id) {
    await fetchIssue(projectId, id);

    showIssueModal();
  }

  async function fetchIssue(projectId, id) {
    const result = await FetchIssue(projectId, id);

    if (result) {
      issue.value = result.ProjectIssue;
    }
  }

  return {
    issueModal,
    issue,

    showIssueModal,
    hideIssueModal,

    editIssue,
  };
});
