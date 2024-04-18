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

export const CreateAttendanceGQL = gql`
  mutation ($input: AttendanceInput!) {
    AttendanceCreate(input: $input) {
      attendance {
        id
        userId
        checkinAt
        checkoutAt
        createdUserId
        createdAt
      }
    }
  }
`;

export const UpdateAttendanceGQL = gql`
  mutation ($input: AttendanceInput!, $id: ID!) {
    AttendanceUpdate(input: $input, id: $id) {
      attendance {
        id
        userId
        checkinAt
        checkoutAt
        createdUserId
        createdAt
      }
    }
  }
`;

export const DestroyAttendanceGQL = gql`
  mutation ($id: ID!) {
    AttendanceDelete(id: $id)
  }
`;
