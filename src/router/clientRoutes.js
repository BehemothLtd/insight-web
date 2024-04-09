export default [
  {
    path: "/clients",
    name: "ClientList",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/clients/index.vue"),
  },
];
