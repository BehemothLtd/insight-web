import gql from "graphql-tag";

export const RemoveIssueOutOfSprintGQL = gql`
  mutation ProjectSprintRemoveIssue($projectId: ID!, $id: ID!, $issueId: ID!) {
    ProjectSprintRemoveIssue(projectId: $projectId, id: $id, issueId: $issueId)
  }
`;

export const MoveIssueIntoSprintGQL = gql`
  mutation ProjectSprintAddIssue($projectId: ID!, $id: ID!, $issueId: ID!) {
    ProjectSprintAddIssue(projectId: $projectId, id: $id, issueId: $issueId)
  }
`;

export const UpdateIssueGQL = gql`
  mutation ProjectUpdateIssue(
    $projectId: ID!
    $id: ID!
    $input: ProjectModifyIssueInput!
  ) {
    ProjectUpdateIssue(projectId: $projectId, id: $id, input: $input) {
      Issue {
        id
        code
        title
        description
        archived
        archiveable
        issueStatusId
        issueType
        priority
        status
        position
        createdAt
        updatedAt
        deadline
        startDate
        parentId
        projectId
        creatorId
        projectSprintId
        statusColorCode
        issueAssignees {
          id
          userId
          developmentRoleId
        }
      }
    }
  }
`;
