import gql from "graphql-tag";

export const SelfUpdateProfileGQL = gql`
  mutation ($input: SelfUpdateProfileInput!) {
    SelfUpdateProfile(input: $input) {
      user {
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
          project {
            name
          }
          active
          title
          name
          joinDate
          leaveDate
        }
      }
    }
  }
`;

export const SelfUpdatePasswordGQL = gql`
  mutation ($input: SelfUpdatePassword!) {
    SelfUpdatePassword(input: $input)
  }
`;

export const UserToggleActiveGQL = gql`
  mutation ($id: ID!) {
    UserToggleActive(id: $id) {
      state
      timingActiveAt
      timingDeactiveAt
    }
  }
`;

export const UserUpdateGQL = gql`
  mutation ($id: ID!, $input: AdminUserInput!) {
    UserUpdate(id: $id, input: $input) {
      user {
        id
        email
        fullName
        state
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
          name
          joinDate
          leaveDate
        }
      }
    }
  }
`;

export const UserCreateGQL = gql`
  mutation UserCreate($input: AdminUserInput!) {
    UserCreate(input: $input)
  }
`;
