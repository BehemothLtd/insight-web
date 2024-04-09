import api from "@/apis/axios";
import combineQuery from "graphql-combine-query";

import { useAuthStore } from "../stores/auth";

import {
  UserGeneralInfoGQL,
  AnalysesTotalSummarizeGQL,
  SelfRecentTasksGQL,
  AnalysesProjectIssueStatusGQL,
  SelfThisWeekIssuesStateGQL,
} from "../apis/resolvers";

export default async function fetchData() {
  const authStore = useAuthStore();

  const query = combineQuery("HomePage")
    .add(UserGeneralInfoGQL)
    .add(AnalysesTotalSummarizeGQL)
    .add(SelfRecentTasksGQL)
    .add(AnalysesProjectIssueStatusGQL)
    .add(SelfThisWeekIssuesStateGQL).document;

  try {
    const data = await api(query);

    authStore.setCurrentUser(data.SelfGeneralInfo);

    return {
      analysesTotalSummarize: data.AnalysesTotalSummarize,
      userRecentTasks: data.SelfRecentTasks,
      analysesProjectsIssueStatus: data.AnalysesProjectsIssueStatus,
      selfThisWeekIssuesState: data.SelfThisWeekIssuesState,
    };
  } catch {}
}
