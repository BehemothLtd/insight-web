import gql from "graphql-tag";

export const ClientsGQL = gql`
  query Clients($input: PagyInput!, $query: ClientsQuery!){
    Clients (input: $input, query: $query) {
      collection {
        id
        name
        createdAt
        updatedAt
        lockVersion
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
