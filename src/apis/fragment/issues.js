import gql from "graphql-tag";

export const IssueBasicFields = gql`
  fragment IssueBasicFieldFragment on Issue {
    id
    code
    title
    description
    archived
    archiveable
    issueStatusId
    issueType
    priority
    status
    position
    createdAt
    updatedAt
    deadline
    startedAt
    parentId
    projectId
    creatorId
    projectSprintId
    assignees {
      id
      name
      avatarUrl
    }
    creator {
      id
      name
      avatarUrl
    }
    statusColorCode
  }
`;
