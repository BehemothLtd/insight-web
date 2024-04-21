import api from "@/apis/axios";

import { FetchSelectOptionsGQL } from "@/apis/resolvers";

export function FetchSelectOptions(keys) {
  return api(
    FetchSelectOptionsGQL,
    {
      input: { keys },
    },
    { loading: false },
  );
}
