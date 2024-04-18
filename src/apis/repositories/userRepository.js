import api from "@/apis/axios";

import { pick, omit } from "lodash";

import { SelfInfoGQL, UsersGQL } from "@/apis/resolvers";
import {
  SelfUpdateProfileGQL,
  UserToggleActiveGQL,
  UserUpdateGQL,
} from "@/apis/mutations";
import { UserGQL } from "../resolvers";
import { UserCreateGQL } from "../mutations/users";

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

const adminMutateKeys = updateKeys.concat([
  "email",
  "state",
  "password",
  "companyLevelId",
]);

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

export function UserCreate(
  input,
  options = { loading: true, toastMessage: "Create User Successfully" },
) {
  input = pick(input, adminMutateKeys);

  return api(UserCreateGQL, { input: input }, options);
}

export function UserUpdate(
  id,
  input,
  options = { loading: true, toastMessage: "Update User Successfully" },
) {
  input = pick(input, adminMutateKeys);

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
