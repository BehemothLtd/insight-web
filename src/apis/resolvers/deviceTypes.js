import gql from "graphql-tag";

export const fetchDeviceTypesListGQL = gql`
  query ($input: PagyInput!) {
    mmDeviceTypes(input: $input) {
      collection {
        id
        name
        devicesCount
      }
      metadata
    }
  }
`;

export const fetchDeviceTypeShowGQL = gql`
  query ($id: ID!) {
    mmDeviceType(id: $id) {
      id
      name
    }
  }
`;
