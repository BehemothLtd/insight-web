import gql from "graphql-tag";

export const FetchAllIssueStatusesGQL = gql`
  query {
    IssueStatusesAll {
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

export const FetchIssueStatusesGQL = gql`
  query IssueStatuses($input: PagyInput, $query: IssueStatusesQuery) {
    IssueStatuses(input: $input, query: $query) {
      collection {
        id
        color
        statusType
        title
        lockVersion
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

export const FetchIssueStatusGQL = gql`
  query IssueStatus($id: ID!) {
    IssueStatus(id: $id) {
      id
      color
      statusType
      title
      lockVersion
    }
  }
`;

export const CreateIssueStatusGQL = gql`
  mutation IssueStatusCreate($input: IssueStatusCreateInput!) {
    IssueStatusCreate(input: $input) {
      issueStatus {
        id
        color
        statusType
        title
      }
    }
  }
`;

export const UpdateIssueStatusGQL = gql`
  mutation IssueStatusUpdate($id: ID!, $input: IssueStatusUpdateInput!) {
    IssueStatusUpdate(id: $id, input: $input) {
      issueStatus {
        id
        color
        statusType
        title
      }
    }
  }
`;
