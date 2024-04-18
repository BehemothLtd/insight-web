import gql from "graphql-tag";

export const CreateProjectGQL = gql`
  mutation ($input: ProjectCreateInput!) {
    ProjectCreate(input: $input) {
      project {
        id
        name
        code
        description
        projectType
        projectPriority
        state
        activedAt
        inactivedAt
        startedAt
        endedAt
        createdAt
        updatedAt
        sprintDuration
        clientId
        currentSprintId
        logoUrl
        lockVersion
      }
    }
  }
`;
