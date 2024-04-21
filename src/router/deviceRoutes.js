export default [
  {
    path: "/devices",
    name: "Device",
    meta: { authRequired: true },
    component: () => import("@/pages/devices/index.vue"),
  },
];
