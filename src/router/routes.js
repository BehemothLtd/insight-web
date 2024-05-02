import ClientsRoute from "./clientRoutes"; 
import ProjectRoutes from "./projectRoutes";

import AdminAttendance from "./AdminAttendance";
import userRoutes from "./userRoutes";
import deviceRoutes from "./deviceRoutes";
import workingTimelogRouters from "./workingTimelogRouters";

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
  ...ClientsRoute,
  ...ProjectRoutes,
  // Admin 
  ...AdminAttendance,
  ...userRoutes,
  ...deviceRoutes,
  ...workingTimelogRouters,
];
