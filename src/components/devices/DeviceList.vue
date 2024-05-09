<template>
  <div>
    <div class="table-responsive">
      <table class="table table-centered table-nowrap table-hover">
        <thead class="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Seller</th>
            <th scope="col">Device Type</th>
            <th scope="col">State</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="deviceItem in devices"
            :key="deviceItem.id"
          >
            <td class="device-row">{{ deviceItem.name }}</td>
            <td class="device-row">{{ deviceItem.code }}</td>
            <td class="device-row">
              {{ deviceItem.seller }}
            </td>
            <td>{{ deviceItem.deviceType.name }}</td>
            <td>
              <BadgeLabel
                :text="deviceItem.state"
                :code="deviceItem.state"
                target="devices"
              ></BadgeLabel>
            </td>
            <td class="device-row">{{ deviceItem.description }}</td>
            <td v-if="writePermission">
              <!-- <span @click="showDevice(deviceItem.id)">
                <i class="mdi mdi-pencil font-size-18 text-success"> </i>
              </span> -->
              <span @click="destroyDevice(deviceItem.id, deviceItem.name)">
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

    <!-- <DeviceModal
      v-if="isShowUpdateModal"
      v-model="isShowUpdateModal"
      title="Update Device"
      @close="isShowUpdateModal = false"
      @submit="updateDevice"
    ></DeviceModal> -->
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useGoQuery } from "@bachdx/b-vuse";
import { FetchDeviceList, DestroyDevice } from "@/apis/repositories";

defineProps({
  writePermission: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Swal = inject("Swal");
const { goQueryInput, updatePage } = useGoQuery({
  perPage: 20,
});

const devices = ref([]);
const device = ref({});
const metadata = ref({});

async function fetchListDevices() {
  const result = await FetchDeviceList({
    input: goQueryInput.pagyInput,
  });

  devices.value = result.Devices.collection;
  metadata.value = result.Devices.metadata;
}

function onPageChange(page) {
  updatePage(page, fetchListDevices);
}

async function destroyDevice(id, name) {
  const confirmation = await Swal.fire({
    title: "Notice !",
    text: `Are you sure want to delete ${name} ? `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Cancel",
  });

  if (confirmation.isConfirmed) {
    await DestroyDevice(id);
    fetchListDevices();
  }
}

defineExpose({
  fetchListDevices,
});

onMounted(async () => {
  await fetchListDevices();
});
</script>

<style lang="scss" scoped>
.device-row {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}
</style>
