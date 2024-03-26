import gql from "graphql-tag";

export const fetchPermissionGroupsGQL = gql`
  query {
    mmPermissionGroups {
      target
      roles {
        id
        action
      }
    }
  }
`;
