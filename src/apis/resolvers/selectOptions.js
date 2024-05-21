import gql from "graphql-tag";

export const FetchSelectOptionsGQL = gql`
  query ($input: SelectOptionsInput!, $params: SelectOptionsParams) {
    SelectOptions(input: $input, params: $params) {
      IssueStatusOptions {
        label
        value
        color
      }
      DevelopmentRoleOptions {
        label
        value
      }
      UserOptions {
        label
        value
      }
      ClientOptions {
        label
        value
      }
      ProjectOptions {
        label
        value
      }
      DeviceTypeOptions {
        label
        value
      }
      IssueTypeOptions {
        label
        value
      }
      IssuePriorityOptions {
        label
        value
      }
      ProjectIssueOptions {
        label
        value
      }
      ProjectIssueStatusOptions {
        label
        value
      }
    }
  }
`;
