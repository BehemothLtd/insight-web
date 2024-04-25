import gql from "graphql-tag";

export const ProjectBasicFields = gql`
  fragment ProjectBasicFieldFragment on Project {
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
    logo {
      url
      key
    }
    files {
      url
      key
    }
  }
`;
