export default [
  {
    path: "/devices",
    name: "Devices",
    meta: { authRequired: true },
    component: () => import("@/pages/devices/index.vue"),
  },
];
