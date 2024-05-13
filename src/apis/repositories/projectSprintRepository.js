import api from "@/apis/axios";

import { FetchProjectSprintsGQL } from "@/apis/resolvers";

import { CreateProjectSprintGQL } from "@/apis/mutations";

export function FetchProjectSprints(id) {
  return api(
    FetchProjectSprintsGQL,
    {
      id,
    },
    { loading: true },
  );
}

export function CreateProjectSprint(projectId, input = {}) {
  return api(
    CreateProjectSprintGQL,
    {
      projectId,
      input,
    },
    { loading: true, toastMessage: "Create Sprint Successfully" },
  );
}
