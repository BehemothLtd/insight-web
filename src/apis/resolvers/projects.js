import gql from "graphql-tag";

import { ProjectBasicFields } from "@/apis/fragment/projects";
import { METADATA_FIELDS } from "@/apis/fragment/shared";

export const FetchProjectListGQL = gql`
  query ($input: PagyInput!, $query: ProjectsQuery!) {
    Projects(input: $input, query: $query) {
      collection {
        id
        name
        code
        logoUrl
        description
        projectType
        projectPriority
        state
        activedAt
        inactivedAt
        startedAt
        endedAt
        createdAt
        updatedAt
        sprintDuration
        clientId
        currentSprintId
        lockVersion
        projectAssignees {
          user {
            id
            name
            avatarUrl
          }
        }
      }
      metadata {
        ...MetadataFragment
      }
    }
  }
  ${METADATA_FIELDS}
`;

export const FetchProjectBasicInfoGQL = gql`
  query ($id: ID!) {
    Project(id: $id) {
      ...ProjectBasicFieldFragment
    }
  }

  ${ProjectBasicFields}
`;
