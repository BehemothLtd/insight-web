import gql from "graphql-tag";

export const fetchProjectSprintDetailGQL = gql`
  query ($id: ID!, $projectId: ID!) {
    mmProjectProjectSprint(id: $id, projectId: $projectId) {
      id
      title
      startDate
      endDate
      lockVersion
      remainingIssues {
        id
        title
        issueType
        status
      }
      issues {
        id
        title
        issueType
        code
        description
        status
        priority
        deadline
        archived
        projectSprintId
        parent {
          id
          title
        }
        assignees {
          id
          avatarUrl
          name
        }
        creator {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;
