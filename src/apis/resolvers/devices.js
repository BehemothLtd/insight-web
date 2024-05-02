import gql from "graphql-tag";
import { METADATA_FIELDS } from "@/apis/fragment";

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

export const DevicesGQL = gql`
  query Devices($input: PagyInput, $query: DevicesQuery) {
    Devices(input: $input, query: $query) {
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
      metadata {
        ...MetadataFragment
      }
    }
  }

  ${METADATA_FIELDS}
`;
