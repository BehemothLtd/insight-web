import gql from "graphql-tag";

export const SelfAttendGQL = gql`
  mutation {
    SelfAttend {
      checkinAt
      checkoutAt
      createdAt
    }
  }
`;
