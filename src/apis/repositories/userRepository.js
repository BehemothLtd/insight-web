import api from "@/apis/axios";

import { pick } from "lodash";

import { SelfInfoGQL } from "@/apis/resolvers";
import { SelfUpdateProfileGQL } from "@/apis/mutations";

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
