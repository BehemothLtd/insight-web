import axios from "axios";
import router from "@/router/index";
// ==========UTILITIES=========
import { get } from "lodash";
import Toast from "@/ultilities/toast";

// ==========STORE=========
import { useAuthStore } from "@/stores/auth";
import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from "pinia";

const BASE_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/${import.meta.env.VITE_APP_GRAPHQL_ENTRY}`;
import { print } from "graphql";

const api = axios.create({
  timeout: 30000,
});

function hideLoading(id) {
  const globalStore = useGlobalStore();

  globalStore.removeLoadingRequest(id);
}

api.interceptors.request.use(
  function (config) {
    const globalStore = useGlobalStore();
    globalStore.validationErrors = {};
    globalStore.errorMessage = "";

    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    if (token.value) {
      config.headers["BhmAIO-Authorization"] = `Bearer ${token.value}`;
    }

    if (config.loading) {
      config.id =
        new Date().getTime() + Math.random().toString(36).substring(2, 15);
      globalStore.addLoadingRequest(config.id);
    }

    return config;
  },
  function (error) {
    // Do something with request error
    if (error.config.loading) hideLoading(error.config.id);

    Toast.error({ title: error.message });

    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    const globalStore = useGlobalStore();

    if (response.config.loading) hideLoading(response.config.id);

    // Do something with response data
    const errors = response.data.errors;

    if (errors && errors.length > 0) {
      const errorMessage =
        get(errors[0], "extensions.message") || "An error occurred";

      const errorCode = get(errors[0], "extensions.code");

      switch (errorCode) {
        case 401:
          const authStore = useAuthStore();
          const { token } = storeToRefs(authStore);

          token.value = null;
          router.push("/login");
          break;
        case 422:
          const validationErrors = get(errors[0], "extensions.errors");

          globalStore.validationErrors = validationErrors || {};
          break;
        default:
          break;
      }

      Toast.error({ title: errorMessage });
    } else if (response.data) {
      if (response.config.toastMessage != null) {
        Toast.success({ title: response.config.toastMessage });
      }

      return response.data.data;
    }
  },
  function (error) {
    if (error.config.loading) hideLoading(error.config.id);

    const errCode = get(error, "response.status");

    const errorMessage =
      get(error, "response.data.errors[0].message") || "An error occurred";

    Toast.error({ title: errorMessage });

    if (errCode === 401) {
      const globalStore = useGlobalStore();
      globalStore.token = null;

      router.push("/login");
    } else if (errCode === 403) {
      router.push("/");
    }

    return Promise.reject(error);
  },
);

export default function (
  query,
  variables,
  options = {
    loading: true,
    requestType: null,
    toastMessage: null,
  },
) {
  // For Uploads
  switch (options.requestType) {
    case "upload":
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        baseURL: import.meta.env.VITE_APP_API_BASE_URL,
        timeout: 300000,
      };

      return api.post("/uploads", variables.data, {
        ...config,
        ...options,
      });
    default:
      return api.post(
        BASE_URL,
        {
          query: print(query),
          variables: variables,
        },
        options,
      );
  }
}
