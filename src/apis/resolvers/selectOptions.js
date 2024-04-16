import gql from "graphql-tag";

export const FetchSelectOptionsGQL = gql`
  query ($input: SelectOptionsInput!) {
    SelectOptions(input: $input) {
      IssueStatusOptions {
        label
        value
      }
    }
  }
`;
