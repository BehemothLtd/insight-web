import gql from "graphql-tag";

export const fetchWorkingLogById = gql`
  query ($id: ID!) {
    WorkingTimelog(id: $id) {
      description
      id
      minutes
      loggedAt
      user {
        id
        name
      }
      issue {
        id
        title
      }
      project {
        id
        name
      }
    }
  }
`;

export const fetchWorkingLogByAttr = gql`
  query ($projectId: ID, $issueId: ID, $loggedAt: String) {
    WorkingTimelogByAttributes(
      projectId: $projectId
      issueId: $issueId
      loggedAt: $loggedAt
    ) {
      dataExisted
      workingTimelog {
        description
        id
        minutes
        loggedAt
        user {
          id
          name
        }
        issue {
          id
          title
        }
        project {
          id
          name
        }
      }
    }
  }
`;

export const fetchWorkingLogList = gql`
  query ($input: PagyInput, $query: WorkingTimelogsQuery) {
    WorkingTimelogs(input: $input, query: $query) {
      collection {
        id
        minutes
        loggedAt
        description
        user {
          id
          name
        }
        issue {
          id
          title
        }
        project {
          id
          name
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

export const selfWorkingTimeLogsGQL = gql`
  query SelfWorkingTimeLogHistory($query: SelfWorkingTimelogHistoryInput) {
    SelfWorkingTimeLogHistory(query: $query) {
      id
      issueName
      issueDescription
      issueId
      projectId
      minutes
      loggedAt
    }
  }
`;
