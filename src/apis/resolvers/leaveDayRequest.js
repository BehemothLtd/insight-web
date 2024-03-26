import gql from "graphql-tag";

export const listLeaveDayRequest = gql`
  query ($input: PagyInput!) {
    mmLeaveDayRequests(input: $input) {
      collection {
        id
        userId
        user {
          name
          fullName
          avatarUrl
        }
        approverId
        approver {
          name
          fullName
          avatarUrl
        }
        from
        to
        timeOff
        reason
        requestState
        requestType
        requestTypeHumanize
        requestStateHumanize
        createdAt
      }
      metadata
    }
  }
`;

export const showLeaveDayRequest = gql`
  query ($id: ID!) {
    mmLeaveDayRequest(id: $id) {
      id
      from
      to
      timeOff
      reason
      requestType
    }
  }
`;

export const leaveDayRequestReport = gql`
  query ($input: PagyInput!) {
    mmLeaveDayRequestReport(input: $input) {
      userId
      approvedTime
      rejectedTime
      pendingTime
      user {
        name
        fullName
        avatarUrl
      }
    }
  }
`;
