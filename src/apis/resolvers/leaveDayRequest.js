import gql from "graphql-tag";

export const listLeaveDayRequest = gql`
  query LeaveDayRequests($input: PagyInput!, $query: LeaveDayRequestsQuery) {
    LeaveDayRequests(input: $input, query: $query) {
      collection {
        id
        userId
        approverId
        from
        to
        timeOff
        requestType
        requestTypeHumanize
        requestState
        requestStateHumanize
        reason
        createdAt
        updatedAt
        User {
          name
          avatarUrl
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

export const getLeaveDayRequest = gql`
  query LeaveDayRequest($id: ID!) {
    LeaveDayRequest(id: $id) {
      id
      userId
      approverId
      from
      to
      timeOff
      requestType
      requestTypeHumanize
      requestState
      requestStateHumanize
      reason
      createdAt
      updatedAt
      lockVersion
      User {
        id
        email
        fullName
        name
        about
        avatarUrl
        createdAt
        companyLevelId
        state
        address
        birthday
        gender
        phone
        timingActiveAt
        timingDeactiveAt
        slackId
      }
    }
  }
`;
