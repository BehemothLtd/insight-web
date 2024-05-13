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
