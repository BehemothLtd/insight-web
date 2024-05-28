import { ref } from "vue";

import { FetchSelectOptions } from "@/apis/repositories";

export default function useSelectOptions() {
  const issueTypeOptions = ref([]);
  const issuePriorityOptions = ref([]);
  const issueOptions = ref([]);
  const issueStatusOptions = ref([]);
  const projectAssigneeOptions = ref([]);
  const developmentRoleOptions = ref([]);

  function fetchSelectOptions(keys, params = {}) {
    FetchSelectOptions(keys, params).then((response) => {
      const result = response.SelectOptions;

      issueTypeOptions.value = result.IssueTypeOptions;
      issuePriorityOptions.value = result.IssuePriorityOptions;
      issueOptions.value = result.ProjectIssueOptions;
      issueStatusOptions.value = result.ProjectIssueStatusOptions;
      projectAssigneeOptions.value = result.ProjectAssigneeOptions;
      developmentRoleOptions.value = result.DevelopmentRoleOptions;
    });
  }

  return {
    issueTypeOptions,
    issuePriorityOptions,
    issueOptions,
    issueStatusOptions,
    projectAssigneeOptions,
    developmentRoleOptions,

    // Method
    fetchSelectOptions,
  };
}
