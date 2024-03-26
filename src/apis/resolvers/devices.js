import gql from "graphql-tag";

export const fetchDevicesListGQL = gql`
  query ($input: PagyInput!) {
    mmDevices(input: $input) {
      collection {
        id
        code
        name
        seller
        state
        deviceTypeId
        deviceType {
          name
        }
        description
      }
      metadata
    }
  }
`;

export const fetchDeviceShowGQL = gql`
  query ($id: ID!) {
    mmDevice(id: $id) {
      id
      code
      name
      seller
      state
      deviceTypeId
      deviceType {
        name
      }
      description
      userId
      discharged
    }
  }
`;
