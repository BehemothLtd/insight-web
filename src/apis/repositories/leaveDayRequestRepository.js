import api from "@/apis/axios";

import { listLeaveDayRequest, getLeaveDayRequest } from "@/apis/resolvers";

import {
  CreateLeaveDayRequestGQL,
  UpdateLeaveDayRequestGQL,
  DeleteLeaveDayRequestGQL,
} from "@/apis/mutations/leaveDayRequest";

export function FetchListLeaveDayRequest(params = { input: {}, query: {} }) {
  return api(listLeaveDayRequest, { input: params.input, query: params.query });
}

export function GetLeaveDayRequest(id) {
  return api(getLeaveDayRequest, { id: id });
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
