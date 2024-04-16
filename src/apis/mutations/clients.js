import gql from "graphql-tag";

export const ClientDeleteGQL = gql`
  mutation ClientDelete($id: ID!) {
    ClientDelete (id: $id) 
  }
`;


export const ClientUpdateGQL = gql`
  mutation ClientUpdate($id: ID!, $input: ClientUpdateInput!) {
    ClientUpdate (id: $id, input: $input) {
      client {
        name
        showOnHomePage
        lockVersion
      }
    } 
  }
`;

export const ClientCreateGQL = gql`
  mutation ClientCreate($input: ClientCreateInput!) {
    ClientCreate (input: $input) {
      client {
        name
        showOnHomePage
        lockVersion
      }
    } 
  }
`;
