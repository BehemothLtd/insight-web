export default [
  {
    path: "/working-time-logs",
    name: "WorkingTimelogs",
    meta: { authRequired: true },
    component: () => import("@/pages/workingTimelogs/index.vue"),
  },
];
