import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useLocalStorage, StorageSerializers } from "@vueuse/core";

import { useRouter } from "vue-router";

import AuthRepository from "@/apis/repositories/authsRepository";
import Toast from "@/utilities/toast";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  // ================ STATES ==========================
  const token = ref(useLocalStorage("authToken", null));

  const currentUser = ref(
    useLocalStorage(
      "currentUser",
      {},
      { serializer: StorageSerializers.object },
    ),
  );

  const permissions = ref(
    useLocalStorage("permissions", [], {
      serializer: StorageSerializers.array,
    }),
  );

  // ================ GETTERS ========================
  const layout = computed(() => !!token.value || "Default");

  // ================ ACTIONS ========================
  function setToken(tokenValue) {
    token.value = tokenValue;
  }

  function setCurrentUser(currentUserValue) {
    currentUser.value = currentUserValue;
  }

  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("permissions");
  }

  async function signInAction({ email, password, rememberMe }) {
    const data = await AuthRepository.signIn({ email, password, rememberMe });

    if (data?.SignIn) {
      token.value = data?.SignIn?.token;

      if (token.value) {
        await fetchUserPermissions();
      }
      router.push("/");
      Toast.success({ title: "Signed In" });
    }
  }

  async function fetchUserPermissions() {
    const result = await AuthRepository.fetchPermissions();

    if (result) {
      permissions.value = result.SelfPermission;
    }
  }

  return {
    // data
    token,
    layout,
    currentUser,
    permissions,

    // function
    setToken,
    signInAction,
    logout,
    setCurrentUser,
  };
});
