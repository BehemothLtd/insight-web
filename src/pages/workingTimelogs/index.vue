<template>
  <b-tabs
    content-class="mt-3"
    lazy
  >
    <b-tab
      v-for="tab in tabSetting"
      :key="tab.label"
      :title="tab.label"
    >
      <component
        :is="tab.component"
        v-if="tab.component"
      />
    </b-tab>
  </b-tabs>
</template>

<script setup>
import WorkingTimeLogListView from "@/components/workingTimelogs/WorkingTimelogListView.vue";
import WorkingTimeLogsTempo from "@/pages/tempo/index.vue";
import { useBreadcrumb } from "@bachdx/b-vuse";

const { setBreadcrumb } = useBreadcrumb();

const tabSetting = [
  {
    label: "Tempo",
    hashKey: "tempo",
    component: WorkingTimeLogsTempo,
    icon: "",
    default: true,
  },
  {
    label: "List",
    hashKey: "list",
    component: WorkingTimeLogListView,
    icon: "",
  },
];

setBreadcrumb({
  title: "Working Logs",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Working Logs",
      href: "/working-time-logs",
    },
  ],
});
</script>

<style scoped></style>
