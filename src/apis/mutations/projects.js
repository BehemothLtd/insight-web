import gql from "graphql-tag";

import { ProjectBasicFields } from "@/apis/fragment/projects";

import { ProjectAssigneeBasicFields } from "@/apis/fragment/projectAssignees";

export const CreateProjectGQL = gql`
  mutation ($input: ProjectCreateInput!) {
    ProjectCreate(input: $input) {
      project {
        ...ProjectBasicFieldFragment
      }
    }
  }
  ${ProjectBasicFields}
`;

export const UpdateProjectGQL = gql`
  mutation ($id: ID!, $input: ProjectUpdateInput!) {
    ProjectUpdate(id: $id, input: $input) {
      project {
        ...ProjectBasicFieldFragment
      }
    }
  }

  ${ProjectBasicFields}
`;

export const DeleteProjectGQL = gql`
  mutation ($id: ID!) {
    ProjectDestroy(id: $id)
  }
`;

export const ProjectUploadImagesGQL = gql`
  mutation ($id: ID!, $input: ProjectUploadImagesInput!) {
    ProjectUploadImages(id: $id, input: $input) {
      project {
        id
        logo {
          key
          url
        }
        files {
          key
          url
        }
      }
    }
  }
`;

export const ProjectCreateProjectAssigneeGQL = gql`
  mutation ProjectCreateProjectAssignee(
    $id: ID!
    $input: ProjectModifyProjectAssigneeInput!
  ) {
    ProjectCreateProjectAssignee(id: $id, input: $input) {
      projectAssignee {
        ...ProjectAssigneeBasicFieldFragment
      }
    }
  }

  ${ProjectAssigneeBasicFields}
`;
