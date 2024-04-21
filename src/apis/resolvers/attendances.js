import gql from "graphql-tag";

export const AttendancesGQL = gql`
  query Attendances($input: PagyInput!, $query: AttendancesQuery!) {
    Attendances(input: $input, query: $query) {
      collection {
        id
        userId
        checkinAt
        checkoutAt
        createdUserId
        createdAt
        user {
          name
        }
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

export const AttendanceGQL = gql`
  query Attendance($id: ID!) {
    Attendance(id: $id) {
      id
      userId
      checkinAt
      checkoutAt
      createdUserId
      createdAt
    }
  }
`;
