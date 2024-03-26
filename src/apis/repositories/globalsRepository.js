import api from "@/apis/axios";

import {
  fetchSelectOptionsGQL,
  fetchPermissionGroupsGQL,
  fetchColorsMappingGQL,
} from "@/apis/resolvers";

export default {
  fetchSelectOptions(input, options = { loading: false, toast: false }) {
    return api(fetchSelectOptionsGQL, { input }, options);
  },

  fetchPermissionGroups(options = { loading: true, toast: false }) {
    return api(fetchPermissionGroupsGQL, null, options);
  },

  fetchColorsMapping(input, options = { loading: false, toast: false }) {
    return api(fetchColorsMappingGQL, { input }, options);
  },
};
