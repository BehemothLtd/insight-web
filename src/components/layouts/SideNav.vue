<template>
  <!-- ========== Left Sidebar Start ========== -->
  <!--- Sidemenu -->
  <div id="sidebar-menu">
    <ul
      id="side-menu"
      class="metismenu list-unstyled"
    >
      <div
        v-for="(child, index) in menu"
        :key="index"
      >
        <li
          v-if="ready[index]"
          :class="{
            active: child.name?.includes(routerName),
          }"
        >
          <router-link
            v-if="child.url"
            :to="`${child.url}`"
          >
            <i
              v-if="child.icon"
              :class="`${child.icon}`"
            />

            <span>{{ child.title }}</span>
          </router-link>

          <div v-else>
            <i
              v-if="child.icon"
              :class="`${child.icon}`"
            />

            <span class="menu-title">{{ child.title }}</span>
          </div>
          <SideNav
            v-if="child.children && child.children.length"
            :menu="child.children"
            :root-level="rootLevel + 1"
          />
        </li>
      </div>
    </ul>
  </div>

  <!-- Sidebar -->
</template>

<script setup>
import { inject, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

import { cloneDeep } from "lodash";

const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },

  rootLevel: {
    type: Number,
    default: () => 0,
  },

  road: {
    type: Array,
    default: () => [],
  },
});

// ===========ROUTE========
const route = useRoute();

const routerName = computed(() => route?.name ?? "");

const hasPermissionOn = inject("hasPermissionOn");

// ===========STORE========
const authStore = useAuthStore();
const { permissions } = storeToRefs(authStore);

// ===========DATA========
const roadMap = ref({});
const ready = ref({});

watch(
  permissions,
  () => {
    checkDisplay();
  },
  { immediate: true },
);

// ===========FUNCTION========
function checkDisplay() {
  for (let i = 0; i < props.menu.length; i++) {
    ready.value[i] = checkPermission(props.menu[i], i);
  }
}

function checkPermission(menu, index, level = 0) {
  if (props.rootLevel == 0 && level == 0) roadMap.value[index] = [index];

  if (props.rootLevel != 0 && props.road.length) {
    if (level == 0) roadMap.value[index] = cloneDeep(props.road);

    if (props.rootLevel < props.road.length) {
      if (props.road[props.rootLevel] == index) return true;
      if (props.road[props.rootLevel] > index) return false;

      roadMap.value[index][props.rootLevel] = index;
    }
  }

  const permission = menu.permission;

  if (permission) return hasPermissionOn(permission.target, permission.action);

  if (!menu.children) return true;

  for (let i = 0; i < menu.children.length; i++) {
    if (checkPermission(menu.children[i], i, level + 1)) {
      roadMap.value[index].push(i);

      return true;
    }
  }
}
</script>

<style lang="scss" scoped>
#side-menu {
  li {
    &.menu-title {
      padding: 10px 15px !important;
    }
    a {
      padding: 10px 19px;
    }
    &.active {
      transition: 0.3s;
      border-left: 5px solid #ff6b00;
      a,
      i {
        font-weight: 500;
        color: #ff6b00;
      }
      &:hover {
        a,
        i {
          color: #ff6b00;
        }
      }
    }
  }
}

body[data-sidebar="dark"] {
  #side-menu {
    li {
      &:not(.active) {
        border-left: 5px solid #2c3148;
      }
      &.active {
        background-color: #12263a;
      }
    }
  }
}
body[data-sidebar="light"] {
  #side-menu {
    li {
      &:not(.active) {
        border-left: 5px solid #fff;
      }
      &.active {
        background-color: #f1f1f1;
      }
    }
  }
}
</style>
