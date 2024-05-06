import gql from "graphql-tag";

export const SelfCreateProjectExperienceGQL = gql`
  mutation ($input: ProjectExperienceInput!) {
    SelfProjectExperienceCreate(input: $input) {
      ProjectExperience {
        id
        title
        description
        projectId
        userId
        createdAt
        updatedAt
      }
    }
  }
`;

export const SelfUpdateProjectExperiencesGQL = gql`
  mutation ($input: ProjectExperienceInput!, $id: ID!) {
    SelfProjectExperienceUpdate(input: $input, id: $id) {
      ProjectExperience {
        id
        title
        description
        projectId
        userId
        createdAt
        updatedAt
      }
    }
  }
`;

export const SelfDestroyProjectExperiencesGQL = gql`
  mutation ($id: ID!) {
    SelfProjectExperienceDestroy(id: $id)
  }
`;
