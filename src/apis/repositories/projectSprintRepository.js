import api from "@/apis/axios";

import { FetchProjectSprintsGQL } from "@/apis/resolvers";

import {
  CreateProjectSprintGQL,
  UpdateProjectSprintGQL,
  DeleteProjectSprintGQL,
  ActiveProjectSprintGQL,
  ArchiveProjectSprintGQL,
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

export function UpdateProjectSprint(projectId, id, input = {}) {
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

export function DeleteProjectSprint(id, projectId) {
  return api(
    DeleteProjectSprintGQL,
    {
      id,
      projectId,
    },
    {
      loading: true,
      toastMessage: "Delete Sprint Successfully",
    },
  );
}

export function ActiveProjectSprint(id, projectId) {
  return api(
    ActiveProjectSprintGQL,
    {
      id,
      projectId,
    },
    {
      loading: true,
      toastMessage: "Active Sprint Successfully",
    },
  );
}

export function ArchiveProjectSprint(id, projectId, moveToId) {
  return api(
    ArchiveProjectSprintGQL,
    {
      id,
      projectId,
      moveToId,
    },
    {
      loading: true,
      toastMessage: "Archive Sprint Successfully",
    },
  );
}
