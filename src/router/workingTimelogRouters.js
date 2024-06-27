export default [
  {
    path: "/working-time-logs",
    name: "WorkingTimeLogs",
    meta: { authRequired: true },
    component: () => import("@/pages/workingTimelogs/index.vue"),
  },
];
