import gql from "graphql-tag";

export const AnalysesTotalSummarizeGQL = gql`
  query {
    AnalysesTotalSummarize {
      IssueCount
      MemberCount
      ProjectCount
      WorkingTimeCount
    }
  }
`;

export const AnalysesProjectIssueStatusGQL = gql`
  query {
    AnalysesProjectsIssueStatus {
      Categories
      Series {
        data
        name
      }
    }
  }
`;
