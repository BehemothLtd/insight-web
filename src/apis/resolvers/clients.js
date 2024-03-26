import gql from "graphql-tag";

export const fetchClientListGQL = gql`
  query ($input: PagyInput) {
    mmClients(input: $input) {
      metadata
      collection {
        id
        name
        showOnHomePage
        avatarUrl
      }
    }
  }
`;

export const fetchClientDetailGQL = gql`
  query ($id: ID!) {
    mmClient(id: $id) {
      id
      name
      showOnHomePage
      avatarUrl
    }
  }
`;
