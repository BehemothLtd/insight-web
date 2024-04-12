export default [
  {
    path: "/projects",
    name: "projectList",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/projects/index.vue"),
  },
];
