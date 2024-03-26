import gql from "graphql-tag";

export const fetchDevicesUsingHistoriesListGQL = gql`
  query ($deviceId: ID!, $input: PagyInput!) {
    mmDevicesUsingHistories(deviceId: $deviceId, input: $input) {
      collection {
        id
        user {
          id
          name
        }
        state
        createdAt
        updatedAt
      }
      metadata
    }
  }
`;
