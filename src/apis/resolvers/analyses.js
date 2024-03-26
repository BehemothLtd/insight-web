import gql from "graphql-tag";

export const fetchAnalysisProjectIssueStatusGQL = gql`
  query {
    mmAnalysesProjectIssueStatus {
      categories
      series {
        data
        name
      }
    }
  }
`;

export const fetchAnalysisTotalSummarizeGQL = gql`
  query {
    mmAnalysesTotalSummarize {
      memberCount
      projectCount
      issueCount
      workingTimeCount
    }
  }
`;

export const fetchAnalysisWorkingTimesGQL = gql`
  query MmAnalysesWorkingTimes($input: MmAnalysesWorkingTimelogInput) {
    mmAnalysesWorkingTimes(input: $input) {
      result
      developmentRoles {
        code
        id
        title
      }
    }
  }
`;
