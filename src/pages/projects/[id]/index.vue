<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between w-100">
        <h4 class="card-title">
          {{ projectDetail.name }}
        </h4>
        <span @click="pinProject">
          <i
            :class="pinIconClass"
            class="font-size-24 align-middle me-2 pin-icon"
          ></i>
        </span>
      </div>
      <p class="card-title-desc text-truncate">
        {{ projectDetail.description }}
      </p>

      <div></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, defineAsyncComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

setBreadcrumb({
  title: "Project",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Project",
      href: "/projects",
    },
    {
      text: "Detail",
      active: true,
    },
  ],
});

// ===========STORE========
import { useProjectStore } from "@/stores/project";
import { useSharedStore } from "@/stores/shared";
const projectStore = useProjectStore();
const sharedStore = useSharedStore();

import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();

// ===========ROUTER=======
const route = useRoute();
const router = useRouter();

// ===========DATA=========
const { projectDetail } = storeToRefs(projectStore);
const currentTab = ref(0);

const projectId = route.params.id;

onMounted(async () => {});
</script>

<style lang="scss" scoped>
.card {
  min-height: calc(100vh - 220px);
}

.pin-icon {
  color: #556ee6;
}
</style>
