<template>
  <div>
    <button
      class="btn btn-primary waves-effect waves-light"
      @click="showNewDeviceTypeModal()"
    >
      <i class="bx bx-plus-circle font-size-16 align-middle me-2"></i>
      New Device Type
    </button>

    <DeviceTypeModal
      v-if="isShowNewModal"
      v-model="isShowNewModal"
      title="Create Device Type"
      @close="isShowNewModal = false"
      @submit="createDeviceType"
    ></DeviceTypeModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDeviceTypesStore } from "@/stores/deviceTypes";

const isShowNewModal = ref(false);

const deviceTypesStore = useDeviceTypesStore();

function showNewDeviceTypeModal() {
  isShowNewModal.value = true;
  deviceTypesStore.newDeviceType();
}

async function createDeviceType() {
  const data = await deviceTypesStore.createDeviceType();

  if (data) {
    isShowNewModal.value = false;
    deviceTypesStore.fetchListDeviceTypes();
  }
}
</script>
