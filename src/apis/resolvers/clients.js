import gql from "graphql-tag";

export const ClientsGQL = gql`
  query Clients($input: PagyInput!, $query: ClientsQuery!){
    Clients (input: $input, query: $query) {
      collection {
        id
        name
        showOnHomePage
        createdAt
        updatedAt
        lockVersion
        avatarUrl
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

export const ClientGQL = gql`
  query Client($id: ID!){
    Client (id: $id) {
      id
      name
      showOnHomePage
      lockVersion
      avatarUrl
    }
  }
`;

