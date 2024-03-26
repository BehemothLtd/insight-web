import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

import { useRouter } from "vue-router";

import AuthRepository from "@/apis/repositories/authsRepository";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  // ================ STATES ==========================
  const token = ref(useLocalStorage("authToken", null));
  const fullName = ref(useLocalStorage("fullName", null));
  const avatarUrl = ref(useLocalStorage("avatarUrl", null));
  const userId = ref(useLocalStorage("userId", null));

  // ================ GETTERS ========================
  const layout = computed(() => !!token.value || "Default");

  // ================ ACTIONS ========================
  function setToken(tokenValue) {
    token.value = tokenValue;
  }

  async function signInAction({ email, password, rememberMe }) {
    const data = await AuthRepository.signIn({ email, password, rememberMe });

    token.value = data?.SignIn?.token;
    // avatarUrl.value = data.signIn?.avatarUrl;
    // fullName.value = data.signIn?.fullName;
    // userId.value = data.signIn?.id;

    router.push("/");
  }

  return {
    // data
    token,
    avatarUrl,
    fullName,
    userId,
    layout,

    // function
    setToken,
    signInAction,
  };
});
