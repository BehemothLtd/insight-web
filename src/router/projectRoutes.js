export default [
  {
    path: "/projects",
    name: "projectList",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/projects/index.vue"),
  },
  {
    path: "/projects/new",
    name: "projectNew",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/projects/new.vue"),
  },
];
