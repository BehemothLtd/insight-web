import gql from "graphql-tag";

export const ClientsGQL = gql`
  query {
    Clients {
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
