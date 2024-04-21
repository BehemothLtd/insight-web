<template>
  <div>
    <div class="table-responsive">
      <table class="table table-centered table-nowrap table-hover">
        <thead class="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Number of devices</th>
            <th
              width="20%"
              scope="col"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="deviceType in deviceTypes"
            :key="deviceType.id"
          >
            <td class="device-type-row">{{ deviceType.name }}</td>
            <td class="device-type-row">{{ deviceType.devicesCount }}</td>
            <td v-if="writePermission">
              <span @click="showDeviceType(deviceType.id)">
                <i class="mdi mdi-pencil font-size-18 text-success"> </i>
              </span>
              <span @click="destroyDeviceType(deviceType.id, deviceType.name)">
                <i class="mdi mdi-delete font-size-18 text-danger ml-4"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination
      :meta="metadata"
      @change="onPageChange"
    ></Pagination>

    <DeviceTypeModal
      v-if="isShowUpdateModal"
      v-model="isShowUpdateModal"
      title="Update Device Type"
      @close="isShowUpdateModal = false"
      @submit="updateDeviceType"
    ></DeviceTypeModal>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useGoQuery } from "@bachdx/b-vuse";
import { DestroyDeviceType } from "@/apis/repositories";
import { useDeviceTypesStore } from "@/stores/deviceTypes";
import { storeToRefs } from "pinia";

defineProps({
  writePermission: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const deviceTypesStore = useDeviceTypesStore();
const Swal = inject("Swal");

const { deviceTypes } = storeToRefs(deviceTypesStore);
const { updatePage } = useGoQuery({
  perPage: 20,
});

const metadata = ref({});
const isShowUpdateModal = ref(false);

function onPageChange(page) {
  updatePage(page, deviceTypesStore.fetchListDeviceTypes);
}

function showDeviceType(id) {
  isShowUpdateModal.value = true;

  deviceTypesStore.showDeviceType(id);
}

async function updateDeviceType() {
  const data = await deviceTypesStore.updateDeviceType();

  if (data) {
    isShowUpdateModal.value = false;
    deviceTypesStore.fetchListDeviceTypes();
  }
}

async function destroyDeviceType(id, name) {
  const confirmation = await Swal.fire({
    title: "Notice !",
    text: `Are you sure want to delete ${name} ? `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Cancel",
  });

  if (confirmation.isConfirmed) {
    await DestroyDeviceType(id);
    deviceTypesStore.fetchListDeviceTypes();
  }
}

onMounted(async () => {
  await deviceTypesStore.fetchListDeviceTypes();
});
</script>

<style lang="scss" scoped>
.device-type-row {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}
</style>
