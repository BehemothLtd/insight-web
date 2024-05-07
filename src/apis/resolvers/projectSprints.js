import gql from "graphql-tag";

export const FetchProjectSprintsGQL = gql`
  query ($id: ID!) {
    ProjectSprints(id: $id) {
      id
      title
      projectId
      startDate
      endDate
      createdAt
      updatedAt
      archived
      lockVersion
      active
    }
  }
`;
