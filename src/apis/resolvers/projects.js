import gql from "graphql-tag";

export const fetchProjectListGQL = gql`
  query ($input: PagyInput!) {
    mmProjects(input: $input) {
      collection {
        code
        createdAt
        description
        id
        name
        projectType
        projectPriority
        updatedAt
        users {
          id
          name
          avatarUrl
        }
        state
        pinned
        inactivedAt
        logoUrl
        images
        startedAt
      }
      metadata
    }
  }
`;

export const fetchProjectDetailGQL = gql`
  query ($id: ID!, $sprintInput: PagyInput) {
    mmProject(id: $id, sprintInput: $sprintInput) {
      code
      createdAt
      description
      id
      name
      pinned
      projectType
      updatedAt
      state
      projectPriority
      activedAt
      inactivedAt
      startedAt
      endedAt
      clientId
      logoUrl
      images
      client {
        name
      }

      projectType
      sprintDuration
      requireIssueStatuses
      lockVersion

      statusBacklogId
      currentSprintId

      projectIssueStatuses {
        id
        issueStatusId
        position
        issueStatus {
          id
          color
          title
          statusType
        }
      }

      currentSprint {
        title
      }

      projectSprints(sprintInput: $sprintInput) {
        collection {
          id
          title
          startDate
          endDate
        }
        metadata
      }

      projectAssignees {
        id
        name
        userId
        avatarUrl
        title
      }

      client {
        name
      }

      setting {
        emailNotifyAssignee
        emailNotifyComment
        emailNotifyIssue
        messageContentAssignee
        messageContentComment
        messageContentIssue
        slackChannelId
        slackNotifyAssignee
        slackNotifyComment
        slackNotifyIssue
      }
    }
  }
`;

export const fetchCalendarViewGQL = gql`
  query ($id: ID!) {
    mmProjectCalendarView(id: $id)
  }
`;
