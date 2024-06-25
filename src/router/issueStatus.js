export default [
  {
    path: "/issue_statuses",
    name: "issueStatusList",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/issueStatus/index.vue"),
  },
];
