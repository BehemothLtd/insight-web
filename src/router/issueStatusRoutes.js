export default [
  {
    path: "/issue_statuses",
    name: "IssueStatusList",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/issueStatus/index.vue"),
  },
];
