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
