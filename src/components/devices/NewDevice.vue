<template>
  <button
    class="btn btn-primary waves-effect waves-light"
    @click="openModal"
  >
    <i class="bx bx-plus-circle font-size-16 align-middle me-2"></i>
    New Device
  </button>

  <b-modal
    ref="modal"
    title="Create Device"
    title-class="font-18"
  >
    <template #header></template>

    <DeviceForm
      v-model="device"
      :device-type-options="deviceTypeOptions"
      :user-options="userOptions"
    ></DeviceForm>

    <template #footer>
      <div class="modal-footer pb-0 border-0">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          @click="hideModal()"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="createDevice"
        >
          Save
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script setup>
import useModal from "@/composable/modal";

import { ref } from "vue";
import { CreateDevice } from "@/apis/repositories";

const { modal, showModal, hideModal } = useModal();

const emits = defineEmits(["submit"]);

defineProps({
  deviceTypeOptions: {
    type: Array,
    required: true,
  },
  userOptions: {
    type: Array,
    required: true,
  },
});

const device = ref({});

function openModal() {
  device.value = {};
  showModal();
}

async function createDevice() {
  const data = await CreateDevice(device.value);

  if (data) {
    hideModal();
    emits("submit");
  }
}
</script>
