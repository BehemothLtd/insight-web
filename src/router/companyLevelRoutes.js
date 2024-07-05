export default [
  {
    path: "/company_levels",
    name: "CompanyLevels",
    meta: {
      authRequired: true,
    },
    component: () => import("@/pages/companyLevels/index.vue"),
  },
];
