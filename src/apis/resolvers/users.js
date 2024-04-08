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

export const SelfAttendancesGQL = gql`
  query SelfAttendances($input: PagyInput!, $query: SelfAttendancesQuery!) {
    SelfAttendances(input: $input, query: $query) {
      collection {
        checkinAt
        checkoutAt
        createdAt
      }
      metadata {
        total
        perPage
        page
        pages
        count
        next
        prev
        from
        to
      }
    }
  }
`;

export const SelfThisWeekIssuesStateGQL = gql`
  query {
    SelfThisWeekIssuesState {
      labels
      series {
        done
        notDone
      }
    }
  }
`;
