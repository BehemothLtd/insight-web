import api from "@/apis/axios";

import {
  FetchProjectListGQL,
  FetchProjectBasicInfoGQL,
} from "@/apis/resolvers";
import {
  CreateProjectGQL,
  UpdateProjectGQL,
  DeleteProjectGQL,
} from "@/apis/mutations";

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

export function FetchProjectBasicInfo(id) {
  return api(
    FetchProjectBasicInfoGQL,
    {
      id: id,
    },
    {
      loading: true,
    },
  );
}

export function UpdateProject(id, input = {}) {
  return api(
    UpdateProjectGQL,
    {
      id: id,
      input: input,
    },
    {
      loading: true,
      toastMessage: "Project Updated Successfully",
    },
  );
}

export function DeleteProject(id) {
  return api(
    DeleteProjectGQL,
    {
      id: id,
    },
    {
      loading: true,
      toastMessage: "Project Deleted Successfully",
    },
  );
}
