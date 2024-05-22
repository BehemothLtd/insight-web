export default [
  {
    path: "/leave_day_requests",
    name: "LeaveDayRequests",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/leaveDayRequests/index.vue"),
  },
  {
    path: "/leave_day_requests/report",
    name: "LeaveDayRequestReport",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/leaveDayRequests/report.vue"),
  },
];
