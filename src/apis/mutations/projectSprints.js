import gql from "graphql-tag";

import { ProjectSprintBasicFields } from "@/apis/fragment/projectSprints";

export const CreateProjectSprintGQL = gql`
  mutation ProjectSprintCreate(
    $projectId: ID!
    $input: ProjectSprintFormInput!
  ) {
    ProjectSprintCreate(projectId: $projectId, input: $input) {
      projectSprint {
        ...ProjectSprintBasicFieldFragment
      }
    }
  }

  ${ProjectSprintBasicFields}
`;

export const UpdateProjectSprintGQL = gql`
  mutation ProjectSprintUpdate(
    $id: ID!
    $projectId: ID!
    $input: ProjectSprintFormInput!
  ) {
    ProjectSprintUpdate(id: $id, projectId: $projectId, input: $input) {
      projectSprint {
        ...ProjectSprintBasicFieldFragment
      }
    }
  }

  ${ProjectSprintBasicFields}
`;

export const DeleteProjectSprintGQL = gql`
  mutation ProjectSprintDestroy($id: ID!, $projectId: ID!) {
    ProjectSprintDestroy(id: $id, projectId: $projectId)
  }
`;

export const ActiveProjectSprintGQL = gql`
  mutation ProjectSprintActive($id: ID!, $projectId: ID!) {
    ProjectSprintActive(id: $id, projectId: $projectId)
  }
`;
