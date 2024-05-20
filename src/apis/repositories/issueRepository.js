import api from "@/apis/axios";

import {
  FetchProjectIssuesListGQL,
  FetchProjectIssueGQL,
} from "@/apis/resolvers/issues";

import {
  RemoveIssueOutOfSprintGQL,
  MoveIssueIntoSprintGQL,
} from "@/apis/mutations/issues";

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
  return api(
    RemoveIssueOutOfSprintGQL,
    {
      projectId,
      id: sprintId,
      issueId,
    },
    { loading: true, toastMessage: "Remove Issue Out of sprint successfully" },
  );
}

export function MoveIssueIntoSprint(projectId, sprintId, issueId) {
  return api(
    MoveIssueIntoSprintGQL,
    {
      projectId,
      id: sprintId,
      issueId,
    },
    { loading: true, toastMessage: "Move Issue into sprint successfully" },
  );
}

export function FetchIssue(projectId, id) {
  return api(
    FetchProjectIssueGQL,
    {
      projectId,
      id,
    },
    { loading: true },
  );
}
