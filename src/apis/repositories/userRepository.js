import api from "@/apis/axios";

import { pick, omit } from "lodash";

import { SelfInfoGQL, UsersGQL } from "@/apis/resolvers";
import {
  SelfUpdateProfileGQL,
  UserToggleActiveGQL,
  UserUpdateGQL,
} from "@/apis/mutations";
import { UserGQL } from "../resolvers";

const updateKeys = [
  "about",
  "avatarKey",
  "slackId",
  "address",
  "birthday",
  "gender",
  "phone",
  "fullName",
];

// const USER_FORM_UNUSE_FIELDS = [
//   "id",
//   "avatarUrl",
//   "name",
//   "projectAssignees",
//   "createdAt",
//   "projectsCount",
//   "timingActiveAt",
//   "timingInactiveAt",
// ];

// Mutations
export function SelfUpdateProfile(
  { input },
  options = { loading: true, toastMessage: "Update Profile Successfully" },
) {
  input = pick(input, updateKeys);
  return api(SelfUpdateProfileGQL, { input }, options);
}

export function UserToggleState(id) {
  return api(UserToggleActiveGQL, { id: id });
}

export function UserUpdate(
  id,
  input,
  options = { loading: true, toastMessage: "Update Profile Successfully" },
) {
  const keys = updateKeys.concat([
    "email",
    "state",
    "password",
    "companyLevelId",
  ]);
  input = pick(input, keys);

  console.log(input);
  return api(UserUpdateGQL, { id: id, input: input }, options);
}

// Queries
export function FetchSelfInfo() {
  return api(SelfInfoGQL);
}

export function FetchUsers(params = { input: {}, query: {} }) {
  return api(UsersGQL, {
    input: params.input,
    query: params.query,
  });
}

export function GetUser(id) {
  return api(UserGQL, { id: id });
}
