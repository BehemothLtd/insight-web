import gql from "graphql-tag";

export const CreateLeaveDayRequestGQL = gql`
  mutation ($input: LeaveDayRequestInput!) {
    LeaveDayRequestCreate(input: $input) {
      leaveDayRequest {
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
      }
    }
  }
`;

export const UpdateLeaveDayRequestGQL = gql`
  mutation LeaveDayRequestUpdate($id: ID!, $input: LeaveDayRequestInput!) {
    LeaveDayRequestUpdate(id: $id, input: $input) {
      leaveDayRequest {
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
      }
    }
  }
`;

export const DeleteLeaveDayRequestGQL = gql`
  mutation LeaveDayRequestDelete($id: ID!) {
    LeaveDayRequestDelete(id: $id)
  }
`;

export const LeaveDayRequestChangeStateGQL = gql`
  mutation LeaveDayRequestStateChange($id: ID!, $requestState: String!) {
    LeaveDayRequestStateChange(id: $id, requestState: $requestState)
  }
`;
