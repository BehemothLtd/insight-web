<template>
  <div id="layout-wrapper">
    Default layout
    <NavBar />
    <SideBar />

    <div class="main-content">
      <div class="page-content min-vh-100">
        <!-- Start Content-->
        <div class="container-fluid">
          <PageHeader />
          <slot />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

// ===========COMPONENT=============
import NavBar from "@/components/layouts/NavBar.vue";
import SideBar from "@/components/layouts/SideBar.vue";
import Footer from "@/components/layouts/Footer.vue";

onMounted(() => {
  document.body.removeAttribute("data-layout", "horizontal");
  document.body.removeAttribute("data-topbar", "dark");
  document.body.removeAttribute("data-layout-size", "boxed");
});
</script>

<style lang="scss" scoped>
.page-content {
  padding: calc(70px + 24px) 12px 40px 12px !important;
}
:deep(.page-content) {
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #d7d7d7;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
}
</style>
