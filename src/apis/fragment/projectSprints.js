import gql from "graphql-tag";

export const ProjectSprintBasicFields = gql`
  fragment ProjectSprintBasicFieldFragment on ProjectSprint {
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
`;
