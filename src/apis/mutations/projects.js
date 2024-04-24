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

export const UpdateProjectGQL = gql`
  mutation ($id: ID!, $input: ProjectUpdateInput!) {
    ProjectUpdate(id: $id, input: $input) {
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

export const DeleteProjectGQL = gql`
  mutation ($id: ID!) {
    ProjectDestroy(id: $id)
  }
`;
