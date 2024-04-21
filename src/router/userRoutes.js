export default [
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
