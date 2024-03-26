import gql from "graphql-tag";

export const timesheetTemplatesQL = gql`
  query ($input: PagyInput!) {
    mmTimesheetTemplates(input: $input) {
      collection {
        id
        name
        settings
        createdAt
        updatedAt
        user {
          fullName
        }
      }
      metadata
    }
  }
`;

export const timesheetTemplateShowQL = gql`
  query ($id: ID!) {
    mmTimesheetTemplateShow(id: $id) {
      id
      name
      settings
    }
  }
`;
