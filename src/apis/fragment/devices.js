import gql from "graphql-tag";

export const DeviceBasicFields = gql`
  fragment DeviceBasicFieldFragment on Device {
    id
    code
    name
    seller
    state
    deviceTypeId
    deviceType {
      id
      name
    }
    description
    userId
  }
`;
