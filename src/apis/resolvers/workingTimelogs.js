import gql from "graphql-tag";

export const MmWorkingTimeLogs = gql`
  query mmWorkingTimeLogs($input: PagyInput!) {
    mmWorkingTimeLogs(input: $input) {
      metadata
      collection {
        createdAt
        description
        id
        minutes
        updatedAt
        loggedAt
        issueId

        issue {
          id
          title
          code
        }
        project {
          id
          code
          name
        }
        user {
          id
          name
        }
      }
    }
  }
`;

export const MmSelfsWorkingTimelogs = gql`
  query MmSelfsWorkingTimelogs($issueId: ID!, $input: PagyInput!) {
    mmSelfsWorkingTimelogs(issueId: $issueId, input: $input) {
      metadata
      collection {
        createdAt
        description
        id
        minutes
        updatedAt
        loggedAt
        issueId
      }
    }
  }
`;

export const MmSelfsWorkingTimelog = gql`
  query MmSelfsWorkingTimelog($issueId: ID!, $id: ID!) {
    mmSelfsWorkingTimelog(issueId: $issueId, id: $id) {
      createdAt
      description
      id
      minutes
      loggedAt
      updatedAt
      issueId
    }
  }
`;

export const MmWorkingTimelogSheet = gql`
  query MmWorkingTimelogSheet($q: BaseScalar) {
    mmWorkingTimelogSheet(q: $q) {
      projectData {
        id
        name
      }
      userData {
        id
        name
        fullName
        state
        totalHours
        companyLevel {
          color
          code
          id
          title
          hourRate
        }
      }
    }
  }
`;

export const MmSelfsLoggedTime = gql`
  query MmWorkingTimelogSheet($input: IssueSelfLoggedTimeInput) {
    MmWorkingTimelogSheet(input: $input) {
      workingTimelog {
        createdAt
        description
        id
        minutes
        updatedAt
      }
    }
  }
`;
