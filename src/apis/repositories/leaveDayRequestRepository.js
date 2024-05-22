import api from "@/apis/axios";

import {
  ListLeaveDayRequestGQL,
  GetLeaveDayRequestGQL,
  LeaveDayRequestReportGQL,
} from "@/apis/resolvers";

import {
  CreateLeaveDayRequestGQL,
  UpdateLeaveDayRequestGQL,
  DeleteLeaveDayRequestGQL,
  LeaveDayRequestChangeStateGQL,
} from "@/apis/mutations/leaveDayRequest";

export function FetchListLeaveDayRequest(params = { input: {}, query: {} }) {
  return api(ListLeaveDayRequestGQL, {
    input: params.input,
    query: params.query,
  });
}

export function GetLeaveDayRequest(id) {
  return api(GetLeaveDayRequestGQL, { id: id });
}

export function CreateLeaveDayRequest(
  { input },
  options = { loading: true, toastMessage: false },
) {
  return api(CreateLeaveDayRequestGQL, { input }, options);
}

export function UpdateLeaveDayRequest(id, input = {}) {
  return api(
    UpdateLeaveDayRequestGQL,
    { id: id, input: input },
    {
      loading: true,
      toastMessage: "Update Leave Day Request Successfully",
    },
  );
}

export function DeleteLeaveDayRequest(id) {
  return api(
    DeleteLeaveDayRequestGQL,
    {
      id: id,
    },
    {
      loading: true,
      toastMessage: "Delete Leave Day Request Successfully",
    },
  );
}

export function LeaveDayRequestChangeState(id, state) {
  return api(
    LeaveDayRequestChangeStateGQL,
    {
      id: id,
      requestState: state,
    },
    {
      loading: true,
      toastMessage: "Change Leave Day Request State Successfully",
    },
  );
}

export function LeaveDayRequestReport({ query }) {
  return api(LeaveDayRequestReportGQL, {
    query: query,
  });
}
