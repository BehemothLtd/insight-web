import gql from "graphql-tag";

export const DeviceTypesGQL = gql`
  query DeviceTypes($input: PagyInput) {
    DeviceTypes(input: $input) {
      collection {
        id
        name
        devicesCount
      }
      metadata {
        total
        perPage
        page
        pages
        count
        next
        prev
        from
        to
      }
    }
  }
`;

export const DeviceTypeGQL = gql`
  query DeviceType($id: ID!) {
    DeviceType(id: $id) {
      id
      name
    }
  }
`;

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
