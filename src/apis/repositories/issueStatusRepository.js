import api from "@/apis/axios";

import { FetchAllIssueStatusesGQL } from "@/apis/resolvers";

export function FetchAllIssueStatuses() {
  return api(FetchAllIssueStatusesGQL, {}, { loading: false });
}
