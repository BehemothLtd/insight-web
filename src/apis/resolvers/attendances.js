import gql from "graphql-tag";

export const fetchAttendanceGQL = gql`
  query MmSelfsAttendanceIndex($input: PagyInput!) {
    mmSelfsAttendanceIndex(input: $input) {
      metadata
      collection {
        checkinAt
        checkoutAt
        createdAt
        id
        updatedAt
      }
    }
  }
`;
