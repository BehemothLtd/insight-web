<template>
  <div>
    <BasicDataFilter
      v-if="searchFieldsList.length > 0"
      :search-fields-list="searchFieldsList"
      :query="query"
      @search="fetchListDevices"
    />

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
              <span @click="showDevice(deviceItem.id)">
                <i class="mdi mdi-pencil font-size-18 text-success"> </i>
              </span>
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

    <b-modal
      ref="modal"
      title="Update Device"
      title-class="font-18"
    >
      <template #header></template>

      <b-tabs v-model="tabIndex">
        <b-tab title="Information">
          <DeviceForm
            v-model="device"
            :device-type-options="deviceTypeOptions"
            :user-options="userOptions"
          ></DeviceForm>
        </b-tab>
        <b-tab title="History"></b-tab>
      </b-tabs>

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
            v-if="tabIndex == 0"
            type="button"
            class="btn btn-primary"
            @click="updateDevice"
          >
            Save
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import useDynamicSearch from "@/composable/dynamicSearch";
import SearchField from "@/types/searchField";
import useModal from "@/composable/modal";

import { omit } from "lodash";
import { onMounted, ref, inject, computed } from "vue";
import { useGoQuery } from "@bachdx/b-vuse";
import { selectOptionDeviceState } from "@/utilities/selectOptions.js";
import {
  FetchDeviceList,
  DestroyDevice,
  FetchDevice,
  UpdateDevice,
} from "@/apis/repositories";

const props = defineProps({
  writePermission: {
    type: Boolean,
    required: false,
    default: false,
  },
  deviceTypeOptions: {
    type: Array,
    required: true,
  },
  userOptions: {
    type: Array,
    required: true,
  },
});

const Swal = inject("Swal");

const devices = ref([]);
const device = ref({});
const metadata = ref({});
const query = ref({});
const tabIndex = ref(0);

const { modal, showModal, hideModal } = useModal();
const { searchFieldsList, searchComponents } = useDynamicSearch();
const { goQueryInput, updatePage } = useGoQuery({
  perPage: 20,
  query: query,
});

const deviceTypeOptions = computed(() => props.deviceTypeOptions);
const userOptions = computed(() => props.userOptions);

searchFieldsList.value = [
  [
    new SearchField(
      "Name",
      "nameCont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
    ),
    new SearchField(
      "Device Type",
      "deviceTypeIdIn",
      "mdi mdi-laptop",
      searchComponents.MultipleSelectField,
      {
        selectOptions: deviceTypeOptions,
      },
    ),
  ],
  [
    new SearchField(
      "User",
      "userIdIn",
      "mdi mdi-account-outline",
      searchComponents.MultipleSelectField,
      {
        selectOptions: userOptions,
      },
    ),
    new SearchField(
      "State",
      "stateIn",
      "mdi mdi-information",
      searchComponents.MultipleSelectField,
      {
        selectOptions: selectOptionDeviceState,
      },
    ),
  ],
];

async function fetchListDevices() {
  const result = await FetchDeviceList({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
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

async function showDevice(id) {
  const result = await FetchDevice(id);
  device.value = result.Device;
  showModal();
}

async function updateDevice() {
  device.value.deviceTypeId = Number(device.value.deviceTypeId);
  device.value.userId = device.value.userId
    ? Number(device.value.userId)
    : null;

  const id = device.value.id;
  const input = omit(device.value, "id");
  const result = await UpdateDevice(id, input);

  if (result) {
    await fetchListDevices();
    hideModal();
  }
}

defineExpose({
  fetchListDevices,
});

onMounted(async () => {
  query.value = {};

  await fetchListDevices();
});
</script>

<style lang="scss" scoped>
.device-row {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}
:deep(.tab-content) {
  margin-top: 20px;
}

:deep(.nav-item) {
  font-weight: 700;
  font-size: 15px;
}
</style>
