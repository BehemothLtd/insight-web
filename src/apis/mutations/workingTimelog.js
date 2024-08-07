import gql from "graphql-tag";

export const logTime = gql`
  mutation ($input: WorkingTimelogInput, $issueId: Int) {
    SelfWorkingTimelogCreateOrUpdate(input: $input, issueId: $issueId) {
      workingTimelog {
        description
        id
        minutes
        loggedAt
        user {
          id
          name
        }
        issue {
          id
          title
        }
        project {
          id
          name
        }
      }
    }
  }
`;

export const destroyWorkingTimelogGql = gql`
  mutation ($id: ID!) {
    SelfWorkingTimelogDestroy(id: $id)
  }
`;
