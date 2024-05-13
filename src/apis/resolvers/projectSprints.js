import gql from "graphql-tag";

import { ProjectSprintBasicFields } from "@/apis/fragment/projectSprints";

export const FetchProjectSprintsGQL = gql`
  query ($id: ID!) {
    ProjectSprints(id: $id) {
      ...ProjectSprintBasicFieldFragment
    }
  }

  ${ProjectSprintBasicFields}
`;
