import gql from "graphql-tag";

export const ProjectIssueStatusBasicFields = gql`
  fragment ProjectIssueStatusBasicFieldFragment on ProjectIssueStatus {
    id
    position
    issueStatusId
    issueStatus {
      id
      color
      statusType
      title
      createdAt
      updatedAt
      lockVersion
    }
  }
`;
