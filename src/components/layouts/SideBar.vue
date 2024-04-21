<script setup>
import simplebar from "simplebar-vue";
import { menu } from "@/utilities/menu";
</script>

<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">
    <simplebar class="h-100">
      <SideNav
        :menu="menu"
        :root-level="0"
      />
    </simplebar>
  </div>
  <!-- Left Sidebar End -->
</template>
