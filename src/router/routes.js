import ProjectRoutes from "./projectRoutes";

import AdminAttendance from "./AdminAttendance";
import userRoutes from "./userRoutes";
import deviceRoutes from "./deviceRoutes";

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
  ...userRoutes,
  ...deviceRoutes,
];
