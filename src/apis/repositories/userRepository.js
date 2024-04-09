import api from "@/apis/axios";

import { pick } from "lodash";

import { SelfInfoGQL, UsersGQL } from "@/apis/resolvers";
import { SelfUpdateProfileGQL } from "@/apis/mutations";
import { UserGQL } from "../resolvers";

export function FetchSelfInfo() {
  return api(SelfInfoGQL);
}

export function SelfUpdateProfile(
  { input },
  options = { loading: true, toastMessage: "Update Profile Successfully" },
) {
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

  input = pick(input, updateKeys);
  return api(SelfUpdateProfileGQL, { input }, options);
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
