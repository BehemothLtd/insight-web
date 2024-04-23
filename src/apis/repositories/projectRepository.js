import api from "@/apis/axios";

import { FetchProjectListGQL, FetchProjectGQL } from "@/apis/resolvers";
import { CreateProjectGQL } from "@/apis/mutations";

export function FetchProjectList(params = { input: {}, query: {} }) {
  return api(
    FetchProjectListGQL,
    {
      input: params.input,
      query: params.query,
    },
    { loading: true },
  );
}

export function CreateProject(input = {}) {
  return api(
    CreateProjectGQL,
    {
      input: input,
    },
    { loading: true, toastMessage: "Create Project Successfully" },
  );
}

export function FetchProject(id) {
  return api(
    FetchProjectGQL,
    {
      id: id,
    },
    {
      loading: true,
    },
  );
}
