<template>
  <!-- <Loading></Loading> -->

  <!-- <DefaultLayout >
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <div>
          <component
            :is="Component"
            :key="route.path"
          />
        </div>
      </transition>
    </router-view>
  </DefaultLayout> -->

  <RouterView></RouterView>
</template>

<script setup>
import DefaultLayout from "@/layouts/default.vue";
import api from "@/apis/axios.js"

import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
