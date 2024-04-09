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
