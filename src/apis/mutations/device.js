import gql from "graphql-tag";

export const UpdateDeviceTypeGQL = gql`
  mutation DeviceTypeUpdate($id: ID!, $input: DeviceTypeInput!) {
    DeviceTypeUpdate(id: $id, input: $input) {
      deviceType {
        id
        name
      }
    }
  }
`;

export const DestroyDeviceTypeGQL = gql`
  mutation DeviceTypeDestroy($id: ID!) {
    DeviceTypeDestroy(id: $id)
  }
`;

export const CreateDeviceTypeGQL = gql`
  mutation DeviceTypeCreate($input: DeviceTypeInput!) {
    DeviceTypeCreate(input: $input) {
      deviceType {
        id
        name
      }
    }
  }
`;
