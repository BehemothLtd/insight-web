<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div
        class="page-title-box d-flex align-items-center justify-content-between"
      >
        <h4 class="mb-0 font-size-18">
          {{ breadcrumb.title }}
        </h4>

        <div class="page-title-right">
          <b-breadcrumb class="m-0">
            <b-breadcrumb-item
              v-for="(item, i) in breadcrumb.items"
              :key="i"
              :text="item.text"
              :to="item.href"
              :active="item.active"
            ></b-breadcrumb-item>
          </b-breadcrumb>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>

<script setup>
import { useBreadcrumb } from "@bachdx/b-vuse";
const { breadcrumb, getBreadcrumb } = useBreadcrumb();
getBreadcrumb();
</script>
<style lang="scss" scoped>
.page-title-box {
  h4 {
    color: #df861d;
  }
}
</style>
