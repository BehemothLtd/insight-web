import gql from "graphql-tag";
import { METADATA_FIELDS } from "@/apis/fragment/shared";

export const DeviceTypesGQL = gql`
  query DeviceTypes($input: PagyInput) {
    DeviceTypes(input: $input) {
      collection {
        id
        name
        devicesCount
      }
      metadata {
        ...MetadataFragment
      }
    }
  }

  ${METADATA_FIELDS}
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

export const DevicesGQL = gql`
  query Devices($input: PagyInput, $query: DevicesQuery) {
    Devices(input: $input, query: $query) {
      collection {
        id
        code
        name
        seller
        state
        description
        deviceType {
          id
          name
        }
      }
      metadata {
        ...MetadataFragment
      }
    }
  }

  ${METADATA_FIELDS}
`;
