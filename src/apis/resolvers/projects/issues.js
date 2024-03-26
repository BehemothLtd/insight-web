import gql from "graphql-tag";

export const fetchProjectIssueListGQL = gql`
  query ($input: PagyInput!, $projectId: ID!) {
    mmProjectIssues(input: $input, projectId: $projectId) {
      metadata
      collection {
        archived
        code
        createdAt
        deadline
        description
        priority
        archiveable
        id
        issueType
        status
        title
        updatedAt
        projectId
        projectSprintId
        parent {
          id
          title
        }
        creator {
          id
          avatarUrl
          name
        }
        assignees {
          id
          avatarUrl
          name
        }
      }
    }
  }
`;

export const fetchProjectIssueDetailGQL = gql`
  query ($id: ID!, $projectId: ID!) {
    mmProjectIssue(id: $id, projectId: $projectId) {
      archived
      archiveable
      code
      createdAt
      deadline
      startDate
      description
      id
      issueType
      status
      priority
      title
      updatedAt
      projectId
      issueStatusId
      projectSprintId
      parentId
      parent {
        id
        title
      }
      creator {
        avatarUrl
        name
      }
      issueAssignees {
        id
        userId
        developmentRoleId
      }
    }
  }
`;

export const fetchProjectBoardGQL = gql`
  query MmProjectIssuesKanban($projectId: ID!, $input: PagyInput!) {
    mmProjectIssuesKanban(projectId: $projectId, input: $input) {
      id
      issueStatus {
        id
        title
      }
      issues {
        id
        issueStatusId
        projectId
        priority
        archived
        code
        deadline
        description
        status
        title
        issueType
        parent {
          id
          title
        }
        creator {
          id
          name
          avatarUrl
        }
        assignees {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

export const fetchIssueComments = gql`
  query ($input: PagyInput, $issueId: ID!, $parentId: ID) {
    mmIssueComments(input: $input, issueId: $issueId, parentId: $parentId) {
      collection {
        children {
          collection {
            detail
            editAble
            id
            isChanged
            updatedAt
            user {
              avatarUrl
              name
              fullName
            }
          }
          metadata
        }
        detail
        editAble
        id
        isChanged
        updatedAt
        user {
          avatarUrl
          name
          fullName
        }
      }
      metadata
    }
  }
`;

export const fetchIssueCommentHistory = gql`
  query ($id: ID!, $issueId: ID!) {
    mmIssueCommentHistories(id: $id, issueId: $issueId) {
      detail
      updatedAt
    }
  }
`;

export const fetchIssueHistories = gql`
  query ($issueId: ID!) {
    mmIssueHistories(issueId: $issueId)
  }
`;
