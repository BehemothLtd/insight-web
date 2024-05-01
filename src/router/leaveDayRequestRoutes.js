export default [
  {
    path: "/leave_day_requests",
    name: "leave_day_requests",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/leaveDayRequests/index.vue"),
  },
];
