import gql from "graphql-tag";

export const fetchSelectOptionsGQL = gql`
  query ($input: [MmSelectOptionInput!]!) {
    mmSelectOptions(input: $input) {
      users {
        label
        value
      }
      currentProjectAssignees {
        label
        value
      }
      projectIssues {
        label
        value
      }
      currentUserProjectIssue {
        label
        value
      }
      issuePriorities {
        label
        value
      }
      developmentRoles {
        label
        value
      }
      projectSprints {
        label
        value
      }
      projectAssignees {
        label
        value
      }
      projectIssueStatuses {
        label
        value
      }
      issueTypes {
        value
        label
      }
      companyLevel {
        value
        label
      }
      assigneeDevelopmentRoles {
        value
        label
        roles {
          value
          label
        }
      }
      projectClients {
        value
        label
      }
      projects {
        value
        label
      }
      projectTypes {
        value
        label
      }
      issueStatuses {
        value
        label
        color
      }
      requestStates {
        value
        label
      }
      requestTypes {
        value
        label
      }
      deviceTypes {
        label
        value
      }
      deviceStates {
        label
        value
      }
      leaveRequestReasons {
        value
        label
      }
      userSlacks {
        value
        label
      }
      projectOptions {
        value
        label
      }
    }
  }
`;

export const fetchColorsMappingGQL = gql`
  query ($input: [MmColorsMappingInput!]!) {
    mmColorsMapping(input: $input) {
      priorities
      issueStatuses
      devices
    }
  }
`;
