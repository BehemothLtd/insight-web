import api from "@/apis/axios";
import combineQuery from "graphql-combine-query";

import { useAuthStore } from "../stores/auth";

import {
  FetchUserGeneralInfoGQL,
  AnalysesTotalSummarizeGQL,
  SelfRecentTasksGQL,
} from "../apis/resolvers";

export default async function fetchData() {
  const authStore = useAuthStore();

  const query = combineQuery("HomePage")
    .add(FetchUserGeneralInfoGQL)
    .add(AnalysesTotalSummarizeGQL)
    .add(SelfRecentTasksGQL).document;

  try {
    const data = await api(query);

    authStore.setCurrentUser(data.SelfGeneralInfo);

    return {
      analysesTotalSummarize: data.AnalysesTotalSummarize,
      userRecentTasks: data.SelfRecentTasks,
    };
  } catch {}
}
