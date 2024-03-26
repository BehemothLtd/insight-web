import gql from "graphql-tag";

export const listIssueStatus = gql`
  query ($input: PagyInput!) {
    mmIssueStatusList(input: $input) {
      collection {
        id
        title
        color
        statusType
        createdAt
      }
      metadata
    }
  }
`;

export const showIssueStatus = gql`
  query ($id: ID!) {
    mmIssueStatusDetails(id: $id) {
      id
      title
      color
      issues {
        id
        code
        archived
        priority
        issueType
        status
        title
      }
      statusType
      createdAt
    }
  }
`;
