import gql from "graphql-tag";

export const FetchProjectListGQL = gql`
  query ($input: PagyInput!, $query: ProjectsQuery!) {
    Projects(input: $input, query: $query) {
      collection {
        id
        name
        code
        logoUrl
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
        lockVersion
        projectAssignees {
          user {
            id
            name
            avatarUrl
          }
        }
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

export const FetchProjectGQL = gql`
  query ($id: ID!) {
    Project(id: $id) {
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
      projectAssignees {
        id
        active
        joinDate
        leaveDate
        developmentRoleId
        userId
        name
        title
        lockVersion
      }
      projectIssueStatuses {
        id
        position
        issueStatusId
      }
    }
  }
`;
