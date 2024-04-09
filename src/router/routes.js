import ClientsRoute from "./clientRoutes";

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
    path: "/graphql_combine",
    name: "GraphqlCombine",
    meta: { authRequired: false },
    component: () => import("@/pages/graphql_combine.vue"),
  },
  ...ClientsRoute,
];
