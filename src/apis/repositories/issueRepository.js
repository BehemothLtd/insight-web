import api from "@/apis/axios";

import { FetchProjectIssuesListGQL } from "@/apis/resolvers/issues";

import { RemoveIssueOutOfSprintGQL } from "@/apis/mutations/issues";

export function FetchProjectIssuesList(projectId, pagyInput = {}, query = {}) {
  return api(
    FetchProjectIssuesListGQL,
    {
      id: projectId,
      input: pagyInput,
      query: query,
    },
    { loading: true },
  );
}

export function RemoveIssueOutOfSprint(projectId, sprintId, issueId) {
  return api(RemoveIssueOutOfSprintGQL, {
    projectId,
    id: sprintId,
    issueId,
  });
}
