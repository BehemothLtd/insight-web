import api from "@/apis/axios";

import {
  SelfAttendancesGQL,
  AttendancesGQL,
  AttendanceGQL,
} from "@/apis/resolvers";

import {
  SelfAttendGQL,
  CreateAttendanceGQL,
  UpdateAttendanceGQL,
  DestroyAttendanceGQL,
} from "@/apis/mutations";

export function FetchSelfAttendances(params = { input: {}, query: {} }) {
  return api(SelfAttendancesGQL, {
    input: params.input,
    query: params.query,
  });
}

export function SelfAttend() {
  return api(SelfAttendGQL, {}, { loading: true, toast: true });
}

export function FetchAttendances(
  { input, query },
  options = { loading: true },
) {
  return api(AttendancesGQL, { input, query }, options);
}

export function ShowAttendance(id, options = { loading: true, toast: false }) {
  return api(AttendanceGQL, { id }, options);
}

export function CreateAttendance(
  { input },
  options = { loading: true, toast: false },
) {
  return api(CreateAttendanceGQL, { input }, options);
}

export function UpdateAttendance(
  { id, input },
  options = { loading: true, toast: false },
) {
  return api(UpdateAttendanceGQL, { id, input }, options);
}

export function DestroyAttendance(
  id,
  options = { loading: true, toast: false },
) {
  return api(DestroyAttendanceGQL, { id }, options);
}
