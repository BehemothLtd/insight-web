import gql from "graphql-tag";

export const companyLevels = gql`
  query {
    mmCompanyLevels {
      id
      title
      color
      code
      hourRate
      users {
        name
        avatarUrl
      }
    }
  }
`;
