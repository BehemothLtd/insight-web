import api from "@/apis/axios";

import { FetchSelectOptionsGQL } from "@/apis/resolvers";

export function FetchSelectOptions(keys, params = {}) {
  return api(
    FetchSelectOptionsGQL,
    {
      input: { keys },
      params,
    },
    { loading: false },
  );
}
