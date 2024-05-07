import gql from "graphql-tag";

export const FetchAllIssueStatusesGQL = gql`
  query {
    IssueStatusesAll {
      id
      color
      statusType
      title
      createdAt
      updatedAt
      lockVersion
    }
  }
`;
