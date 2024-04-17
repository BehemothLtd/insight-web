export default [
  {
    path: "/attendance-manage",
    name: "AdminAttendance",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/adminAttendance/index.vue"),
  },
];
