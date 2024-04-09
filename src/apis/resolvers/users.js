import gql from "graphql-tag";

export const UserGeneralInfoGQL = gql`
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

export const SelfInfoGQL = gql`
  query {
    SelfProfile {
      id
      email
      fullName
      name
      about
      avatarUrl
      createdAt
      companyLevelId
      address
      birthday
      gender
      phone
      timingActiveAt
      timingDeactiveAt
      slackId
      projectAssignees {
        active
        title
        joinDate
        leaveDate
        name
        project {
          name
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

export const UsersGQL = gql`
  query Users($input: PagyInput!, $query: UsersQuery!) {
    Users(input: $input, query: $query) {
      collection {
        id
        email
        fullName
        name
        about
        avatarUrl
        createdAt
        companyLevelId
        state
        address
        birthday
        gender
        phone
        timingActiveAt
        timingDeactiveAt
        slackId
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

export const UserGQL = gql`
  query User($id: ID!) {
    User(id: $id) {
      id
      email
      fullName
      name
    }
  }
`;
