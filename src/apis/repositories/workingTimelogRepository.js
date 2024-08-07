import api from "@/apis/axios";

import * as WorkingTimelogMutation from "@/apis/mutations/workingTimelog";
import * as WorkingTimelogQuery from "@/apis/resolvers/workingTimelog";

export function fetchListWorkingLogs(params, options = { loading: true }) {
  return api(WorkingTimelogQuery.fetchWorkingLogList, params, options);
}

export function logTime(
  params,
  options = { loading: true, toastMessage: "Log time successful" },
) {
  return api(WorkingTimelogMutation.logTime, params, options);
}

export function fetchWorkingTimelogByAttr(
  params,
  options = { loading: false, hideToastError: true },
) {
  return api(WorkingTimelogQuery.fetchWorkingLogByAttr, params, options);
}

export function fetchWorkingTimelogById(
  params,
  options = { loading: true, toastMessage: "Toast success" },
) {
  return api(WorkingTimelogQuery.fetchWorkingLogById, params, options);
}

export function selfWorkingTimelogs(
  params,
  options = { loading: true, hideToastError: true },
) {
  return api(WorkingTimelogQuery.selfWorkingTimeLogsGQL, params, options);
}

export function destroyWorkingTimelog(
  params,
  options = { loading: true, toastMessage: "Toast success" },
) {
  return api(WorkingTimelogMutation.destroyWorkingTimelogGql, params, options);
}
