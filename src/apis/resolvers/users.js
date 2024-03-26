import gql from "graphql-tag";

export const fetchUserListGQL = gql`
  query ($input: PagyInput) {
    mmUsers(input: $input) {
      collection {
        id
        fullName
        name
        email
        slackId
        about
        avatarUrl
        state
        companyLevel {
          color
          title
        }
      }
      metadata
    }
  }
`;
export const fetchUserListOptionsGQL = gql`
  query ($input: PagyInput) {
    mmUsers(input: $input) {
      collection {
        id
        fullName
        name
        email
        state
      }
      metadata
    }
  }
`;

export const fetchUserGQL = gql`
  query ($id: ID!) {
    mmUser(id: $id) {
      fullName
      name
      email
      slackId
      about
      avatarUrl
      state
      createdAt
      companyLevelId
      timingInactiveAt
      timingActiveAt
      birthday
      gender
      address
      phone
      projectAssignees {
        name
        active
        title
        joinDate
        leaveDate
        project {
          name
        }
      }
      lockVersion
    }
  }
`;

export const fetchUserProfileGQL = gql`
  query {
    mmSelfsProfile {
      fullName
      name
      email
      slackId
      about
      avatarUrl
      state
      projectsCount
      createdAt
      companyLevelId
      timingInactiveAt
      timingActiveAt
      birthday
      gender
      address
      phone
      projectAssignees {
        name
        active
        title
        joinDate
        leaveDate
        project {
          name
        }
      }
      lockVersion
    }
  }
`;

export const fetchUserPermissionsGQL = gql`
  query {
    mmSelfsPermissions {
      target
      action
    }
  }
`;

export const fetchMmUsersGQL = gql`
  query ($input: PagyInput!) {
    mmUsers(input: $input) {
      collection {
        fullName
        id
        about
        avatarUrl
        slackId
        name
        email
      }
      metadata
    }
  }
`;

export const fetchUserGeneralInfoGQL = gql`
  query {
    mmSelfsGeneralInfo {
      id
      fullName
      about
      avatarUrl
      name
      projectsCount
      issuesCount
      thisMonthWorkingHours {
        hours
        percentCompareToLastMonth
        upFromLastMonth
        timeGraphOnProjects
      }
    }
  }
`;

export const fetchUserRecentTasksGQL = gql`
  query {
    mmSelfsRecentTasks {
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

export const fetchUserThisWeekIssuesStateGQL = gql`
  query {
    mmSelfsThisWeekIssuesState
  }
`;
