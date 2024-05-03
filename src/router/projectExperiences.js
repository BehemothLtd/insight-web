export default [
  {
    path: "/project_experiences",
    name: "Project Experiences",
    meta: { authRequired: true },
    component: () => import("@/pages/projectExperiences/index.vue"),
  },
];
