import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

// import { useUserStore } from "@/stores/user";

import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  setBreadcrumb({});

  const requiresAuth = to.meta.authRequired;

  const authStore = useAuthStore();
  const isAuthenticated = authStore.token;

  // const userStore = useUserStore();

  if (requiresAuth && !isAuthenticated) {
    authStore.token = null;
    next("/login");
  } else {
    if (to.path !== "/login") {
      // await userStore.fetchUserPermissions();
    }

    next();
  }
});

export default router;
