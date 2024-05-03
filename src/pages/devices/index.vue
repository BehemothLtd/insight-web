<template>
  <div>
    <div class="btn-create-device">
      <!-- <NewDevice v-if="tabIndex == 0"></NewDevice> -->
      <NewDeviceType
        v-if="tabIndex == 1"
        @submit="deviceTypeListRef.fetchListDeviceTypes()"
      ></NewDeviceType>
    </div>
    <b-card no-body>
      <b-tabs
        v-model="tabIndex"
        card
      >
        <b-tab title="Devices">
          <!-- <DeviceSearch></DeviceSearch> -->
          <DeviceList
            v-if="tabIndex == 0"
            ref="deviceListRef"
            :write-permission="writePermission"
          ></DeviceList>
        </b-tab>

        <b-tab title="Device Types">
          <DeviceTypeList
            v-if="tabIndex == 1"
            ref="deviceTypeListRef"
            :write-permission="writePermission"
          ></DeviceTypeList>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import { useBreadcrumb } from "@bachdx/b-vuse";

const { setBreadcrumb } = useBreadcrumb();

const tabIndex = ref(0);
const deviceListRef = ref();
const deviceTypeListRef = ref();

const hasPermissionOn = inject("hasPermissionOn");
const writePermission = computed(() => hasPermissionOn("devices", "write"));

setBreadcrumb({
  title: "Device List",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Device",
      href: "/devices",
    },
  ],
});
</script>

<style lang="scss" scoped>
.btn-create-device {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 20px;
  height: 40px;
}

:deep(.nav-item) {
  font-weight: 700;
  font-size: 15px;
}
</style>
