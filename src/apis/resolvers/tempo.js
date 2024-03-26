import gql from "graphql-tag";

export const mmSelfsWorkingTimeHistoryGQL = gql`
  query ($input: WorkingTimeHistoryInput!) {
    mmSelfsWorkingTimeHistory(input: $input) {
      id
      loggedAt
      issueId
      totalMinutes
      issueName
      issueDescription
      projectId
    }
  }
`;

export const mmSelfsWorkingTimeShowGQL = gql`
  query ($id: ID!) {
    mmSelfsWorkingTimeHistoryShow(id: $id) {
      createdAt
      description
      id
      issueId
      loggedAt
      minutes
      updatedAt
      projectId
    }
  }
`;
