import gql from "graphql-tag";

export const ProjectAssigneeBasicFields = gql`
  fragment ProjectAssigneeBasicFieldFragment on ProjectAssignee {
    id
    active
    joinDate
    leaveDate
    developmentRoleId
    userId
    name
    title
    lockVersion
    user {
      id
      fullName
      name
      avatarUrl
    }
    developmentRole {
      id
      code
      title
    }
  }
`;
