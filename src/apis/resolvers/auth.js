import gql from "graphql-tag";

export const fetchUserPermissionsGQL = gql`
  query SelfPermission {
    SelfPermission {
      id
      Target
      Action
    }
  }
`;
