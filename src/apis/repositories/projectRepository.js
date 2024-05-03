import api from "@/apis/axios";

import {
  FetchProjectListGQL,
  FetchProjectBasicInfoGQL,
} from "@/apis/resolvers";

import {
  CreateProjectGQL,
  UpdateProjectGQL,
  DeleteProjectGQL,
  ProjectUploadImagesGQL,
  ProjectCreateProjectAssigneeGQL,
  ProjectUpdateProjectAssigneeGQL,
  ProjectDeleteProjectAssigneeGQL,
  ProjectUpdateProjectIssueStatusOrderGQL,
  ProjectDeleteProjectIssueStatusGQL,
  ProjectCreateProjectIssueStatusGQL,
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

export function UploadProjectImages(id, logoKey = "", fileKeys = []) {
  return api(
    ProjectUploadImagesGQL,
    {
      id: id,
      input: {
        logoKey: logoKey,
        fileKeys: fileKeys,
      },
    },
    {
      loading: true,
      toastMessage: "Project Upload Images Successfully",
    },
  );
}

export function AddProjectAssigneeToProject(id, input = {}) {
  return api(
    ProjectCreateProjectAssigneeGQL,
    {
      id: id,
      input: input,
    },
    {
      loading: true,
      toastMessage: "Add Member To Project Successfully",
    },
  );
}

export function UpdateProjectAssigneeInProject(projectId, id, input = {}) {
  return api(
    ProjectUpdateProjectAssigneeGQL,
    {
      id: id,
      projectId: projectId,
      input: input,
    },
    {
      loading: true,
      toastMessage: "Update Member In Project Successfully",
    },
  );
}

export function DeleteProjectAssigneeInProject(projectId, id) {
  return api(
    ProjectDeleteProjectAssigneeGQL,
    {
      id: id,
      projectId: projectId,
    },
    {
      loading: true,
      toastMessage: "Remove Member in Project Successfully",
    },
  );
}

export function ProjectUpdateProjectIssueStatusOrder(projectId, newOrderIds) {
  return api(
    ProjectUpdateProjectIssueStatusOrderGQL,
    {
      id: projectId,
      input: newOrderIds,
    },
    {
      loading: true,
      toastMessage: "Updated New Issue Status Order",
    },
  );
}

export function ProjectDeleteProjectIssueStatus(projectId, id) {
  return api(
    ProjectDeleteProjectIssueStatusGQL,
    {
      projectId,
      id,
    },
    {
      loading: true,
      toastMessage: "Deleted Status Successfully",
    },
  );
}

export function ProjectCreateProjectIssueStatus(projectId, issueStatusId) {
  return api(
    ProjectCreateProjectIssueStatusGQL,
    {
      projectId: projectId,
      id: issueStatusId,
    },
    {
      loading: true,
      toastMessage: "Create new status successfully",
    },
  );
}
