import api from "@/apis/axios";

import { FetchProjectListGQL } from "@/apis/resolvers";

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
