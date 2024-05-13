import api from "@/apis/axios";

import { FetchProjectSprintsGQL } from "@/apis/resolvers";

import {
  CreateProjectSprintGQL,
  UpdateProjectSprintGQL,
} from "@/apis/mutations";

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
    {
      loading: true,
      toastMessage: "Create Sprint Successfully",
    },
  );
}

export function UpdateProjectSprint(id, projectId, input = {}) {
  return api(
    UpdateProjectSprintGQL,
    {
      id,
      projectId,
      input,
    },
    {
      loading: true,
      toastMessage: "Update Sprint Successfully",
    },
  );
}
