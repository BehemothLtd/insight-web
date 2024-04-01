import gql from "graphql-tag";

export const FetchUserGeneralInfoGQL = gql`
  query {
    SelfGeneralInfo {
      id
      email
      name
      fullName
      issuesCount
      projectsCount
      avatarUrl
    }
  }
`;
