import gql from "graphql-tag";

export const fetchProjectAssigneeListGQL = gql`
  query ($input: PagyInput!, $projectId: ID!) {
    mmProjectAssignees(input: $input, projectId: $projectId) {
      metadata
      collection {
        id
        name
        avatarUrl
        title
        active
        joinDate
        leaveDate
        lockVersion
        userId
        developmentRoleId
      }
    }
  }
`;
