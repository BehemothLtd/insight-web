import gql from "graphql-tag";

export const FetchProjectListGQL = gql`
  query ($input: PagyInput!, $query: ProjectsQuery!) {
    Projects(input: $input, query: $query) {
      collection {
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
