import api from "@/apis/axios";

import {
  FetchAllIssueStatusesGQL,
  FetchIssueStatusesGQL,
  FetchIssueStatusGQL,
  CreateIssueStatusGQL,
  UpdateIssueStatusGQL,
} from "@/apis/resolvers";

export function FetchAllIssueStatuses() {
  return api(FetchAllIssueStatusesGQL, {}, { loading: false });
}

export function FetchIssueStatuses(params = {}) {
  return api(
    FetchIssueStatusesGQL,
    {
      input: params.input,
      query: params.query,
    },
    { loading: false },
  );
}

export function FetchIssueStatus(id) {
  return api(FetchIssueStatusGQL, { id }, { loading: false });
}

export function CreateIssueStatus({ input }) {
  return api(CreateIssueStatusGQL, {
    input,
  });
}

export function UpdateIssueStatus({ id, input }) {
  return api(UpdateIssueStatusGQL, {
    id,
    input,
  });
}
