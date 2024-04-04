import gql from "graphql-tag";

export const FetchUserGeneralInfoGQL = gql`
  query {
    SelfGeneralInfo {
      id
      email
      name
      fullName
      issuesCount
      projectsCount
      avatarUrl
      thisMonthWorkingHours {
        hours
        percentCompareToLastMonth
        upFromLastMonth
        timeGraphOnProjects {
          labels
          series
        }
      }
    }
  }
`;

export const SelfRecentTasksGQL = gql`
  query {
    SelfRecentTasks {
      id
      projectId
      title
      assignees {
        id
        name
        avatarUrl
      }
    }
  }
`;
