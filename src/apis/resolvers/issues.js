import gql from "graphql-tag";

import { IssueBasicFields, METADATA_FIELDS } from "@/apis/fragment";

export const FetchProjectIssuesListGQL = gql`
  query ($id: ID!, $input: PagyInput, $query: ProjectIssuesQuery) {
    ProjectIssues(id: $id, input: $input, query: $query) {
      collection {
        ...IssueBasicFieldFragment
      }
      metadata {
        ...MetadataFragment
      }
    }
  }

  ${METADATA_FIELDS}
  ${IssueBasicFields}
`;
