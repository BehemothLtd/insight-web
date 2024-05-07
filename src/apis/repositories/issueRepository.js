import api from "@/apis/axios";

import { FetchProjectIssuesListGQL } from "@/apis/resolvers/issues";

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
