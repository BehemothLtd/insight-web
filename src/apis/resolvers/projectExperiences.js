import gql from "graphql-tag";

export const selfProjectExperiencesGQL = gql`
  query ($input: PagyInput!, $query: ProjectExperiencesQuery!) {
    SelfProjectExperiences(input: $input, query: $query) {
      collection {
        id
        title
        createdAt
        description
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

export const ProjectExperienceGQL = gql`
  query ($id: ID!) {
    ProjectExperience(id: $id) {
      id
      title
      description
      projectId
      userId
      createdAt
      updatedAt
    }
  }
`;
