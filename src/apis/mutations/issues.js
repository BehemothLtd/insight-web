import gql from "graphql-tag";

export const RemoveIssueOutOfSprintGQL = gql`
  mutation ProjectSprintRemoveIssue($projectId: ID!, $id: ID!, $issueId: ID!) {
    ProjectSprintRemoveIssue(projectId: $projectId, id: $id, issueId: $issueId)
  }
`;
