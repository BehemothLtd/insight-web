import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useLocalStorage, StorageSerializers } from "@vueuse/core";

import { useRouter } from "vue-router";

import AuthRepository from "@/apis/repositories/authsRepository";

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

  // ================ GETTERS ========================
  const layout = computed(() => !!token.value || "Default");

  // ================ ACTIONS ========================
  function setToken(tokenValue) {
    token.value = tokenValue;
  }

  function setCurrentUser(currentUserValue) {
    currentUser.value = currentUserValue;
  }

  async function signInAction({ email, password, rememberMe }) {
    const data = await AuthRepository.signIn({ email, password, rememberMe });

    token.value = data?.SignIn?.token;

    router.push("/");
  }

  return {
    // data
    token,
    layout,
    currentUser,

    // function
    setToken,
    signInAction,

    setCurrentUser,
  };
});
