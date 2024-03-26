import gql from "graphql-tag";

export const fetchUserGroupListGQL = gql`
  query ($input: PagyInput!) {
    mmUserGroups(input: $input) {
      collection {
        id
        title
        lockVersion
        users {
          id
          name
          avatarUrl
        }
        createdAt
        updatedAt
      }
      metadata
    }
  }
`;

export const fetchUserGroupDetailGQL = gql`
  query ($id: ID!) {
    mmUserGroup(id: $id) {
      createdAt
      id
      lockVersion
      title
      updatedAt

      users {
        id
        name
        email
      }
      usersUserGroups {
        id
        userId
      }

      permissionIds
    }
  }
`;
