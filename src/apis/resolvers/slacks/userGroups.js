import gql from "graphql-tag";

export const fetchSlackUserGroupsGQL = gql`
  query MmSlackUserGroups {
    mmSlackUserGroups {
      autoProvision
      autoType
      channelCount
      createdBy
      dateCreate
      dateDelete
      dateUpdate
      deletedBy
      description
      enterpriseSubteamId
      handle
      id
      isExternal
      isSubteam
      isUsergroup
      name
      teamId
      updatedBy
      userCount
    }
  }
`;

export const fetchSlackUserGroupUsersGQL = gql`
  query MmSlackUserGroups($id: ID) {
    mmSlackUserGroupsUsers(id: $id) {
      id
      fullName
      name
      email
      slackId
      about
      avatarUrl
      state
      createdAt
      companyLevelId
      timingInactiveAt
      timingActiveAt
      birthday
      gender
      address
      phone
    }
  }
`;
