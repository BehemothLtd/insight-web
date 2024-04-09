import ProjectRoutes from "./projectRoutes";

import AdminAttendance from "./AdminAttendance";

export default [
  {
    path: "/",
    name: "default",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { authRequired: false },
    component: () => import("@/pages/auth/login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { authRequired: true },
    component: () => import("@/pages/users/profile.vue"),
  },

  ...ProjectRoutes,

  // Admin
  ...AdminAttendance,
  {
    path: "/users",
    name: "User",
    meta: { authRequired: true },
    component: () => import("@/pages/users/index.vue"),
  },
  {
    path: "/users/:id",
    name: "UserDetail",
    meta: { authRequired: true },
    component: () => import("@/pages/users/[id]/index.vue"),
  },
];
