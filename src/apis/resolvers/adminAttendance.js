import gql from "graphql-tag";

export const attendanceAdminsQL = gql`
  query ($input: PagyInput!) {
    mmAttendances(input: $input) {
      collection {
        userId
        id
        checkoutAt
        checkinAt
        createdAt
        createdUserId
        user {
          name
        }
      }

      metadata
    }
  }
`;

export const attendanceAdminShowQL = gql`
  query ($id: ID!) {
    mmAttendanceShow(id: $id) {
      id
      checkinAt
      checkoutAt
      userId
    }
  }
`;
