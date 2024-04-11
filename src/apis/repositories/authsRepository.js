import api from "@/apis/axios";

import { SignInMutation } from "@/apis/mutations";
import { fetchUserPermissionsGQL } from "@/apis/resolvers";

export default {
  signIn(input, options = { loading: true, toast: true }) {
    return api(SignInMutation, input, options);
  },
  fetchPermissions(options = { loading: false, toast: false }) {
    return api(fetchUserPermissionsGQL, null, options);
  },
};
