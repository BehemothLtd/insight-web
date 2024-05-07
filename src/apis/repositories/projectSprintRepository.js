import api from "@/apis/axios";

import { FetchProjectSprintsGQL } from "@/apis/resolvers";

export function FetchProjectSprints(id) {
  return api(
    FetchProjectSprintsGQL,
    {
      id,
    },
    { loading: true },
  );
}
