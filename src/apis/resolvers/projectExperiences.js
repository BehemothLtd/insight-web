import gql from "graphql-tag";

export const projectExperiencesGQL = gql`
  query ($input: PagyInput!) {
    mmProjectExperiences(input: $input) {
      collection {
        id
        title
        createdAt
        project {
          id
          name
        }
        description
      }
      metadata
    }
  }
`;

export const projectExperienceGQL = gql`
  query ($id: ID!) {
    mmProjectExperience(id: $id) {
      id
      projectId
      userId
      title
      description
    }
  }
`;
