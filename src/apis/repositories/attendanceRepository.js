import api from "@/apis/axios";

import { SelfAttendancesGQL } from "@/apis/resolvers";

import { SelfAttendGQL } from "@/apis/mutations";

export function FetchSelfAttendances(params = { input: {}, query: {} }) {
  return api(SelfAttendancesGQL, {
    input: params.input,
    query: params.query,
  });
}

export function SelfAttend() {
  return api(SelfAttendGQL, {}, { loading: true });
}
