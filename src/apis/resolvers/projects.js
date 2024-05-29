import gql from "graphql-tag";

import { ProjectBasicFields } from "@/apis/fragment/projects";
import {
  ProjectAssigneeBasicFields,
  ProjectIssueStatusBasicFields,
  METADATA_FIELDS,
  IssueBasicFields,
} from "@/apis/fragment";

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
      projectAssignees {
        ...ProjectAssigneeBasicFieldFragment
      }
      projectIssueStatuses {
        ...ProjectIssueStatusBasicFieldFragment
      }
    }
  }

  ${ProjectBasicFields}
  ${ProjectAssigneeBasicFields}
  ${ProjectIssueStatusBasicFields}
`;

export const FetchProjectBoardDataGQL = gql`
  query ($id: ID!) {
    ProjectBoard(id: $id) {
      id
      issueStatus {
        id
        title
      }
      issues {
        ...IssueBasicFieldFragment
        issueAssignees {
          id
          userId
          developmentRoleId
        }
      }
    }
  }

  ${IssueBasicFields}
`;
