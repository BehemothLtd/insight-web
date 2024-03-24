<template>
  <div class="row">
    
  </div>
</template>

<script setup>
import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();

setBreadcrumb({
  title: "DASHBOARD",
  items: [
    {
      text: "Dashboard",
      active: true,
    },
  ],
});
</script>
