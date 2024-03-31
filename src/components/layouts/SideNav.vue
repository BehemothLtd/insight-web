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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

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

// ===========DATA========
const ready = computed(() => {
  const obj = {}

  for (let i = 0; i < props.menu.length; i++) {
    obj[i] = true
  }

  return obj
})
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
