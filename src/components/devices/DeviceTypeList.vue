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
            v-for="deviceTypeItem in deviceTypes"
            :key="deviceTypeItem.id"
          >
            <td class="device-type-row">{{ deviceTypeItem.name }}</td>
            <td class="device-type-row">{{ deviceTypeItem.devicesCount }}</td>
            <td v-if="writePermission">
              <span @click="showDeviceTypeModal(deviceTypeItem.id)">
                <i class="mdi mdi-pencil font-size-18 text-success"> </i>
              </span>
              <span
                @click="
                  destroyDeviceType(deviceTypeItem.id, deviceTypeItem.name)
                "
              >
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
      title="Update Device Type"
      title-class="font-18"
    >
      <form class="outer-repeater">
        <div
          data-repeater-list="outer-group"
          class="outer"
        >
          <div
            data-repeater-item
            class="outer"
          >
            <div class="form-group row mb-4">
              <div class="col-lg-12">
                <FormValidator
                  name="name"
                  label="Name"
                  required
                >
                  <input
                    v-model="deviceType.name"
                    class="form-control"
                    type="text"
                  />
                </FormValidator>
              </div>
            </div>
          </div>
        </div>
      </form>

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
            @click="updateDeviceType"
          >
            Save
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useGoQuery } from "@bachdx/b-vuse";
import { omit } from "lodash";
import {
  FetchDeviceTypes,
  FetchDeviceType,
  UpdateDeviceType,
  DestroyDeviceType,
} from "@/apis/repositories";
import useModal from "@/composable/modal";

defineProps({
  writePermission: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const { modal, showModal, hideModal } = useModal();

const Swal = inject("Swal");

const { goQueryInput, updatePage } = useGoQuery({
  perPage: 20,
});

const deviceTypes = ref([]);
const deviceType = ref({});
const metadata = ref({});

async function fetchListDeviceTypes() {
  const result = await FetchDeviceTypes({
    input: goQueryInput.pagyInput,
  });

  deviceTypes.value = result.DeviceTypes.collection;
  metadata.value = result.DeviceTypes.metadata;
}

async function showDeviceType(id) {
  const result = await FetchDeviceType(id);

  deviceType.value = result.DeviceType;
}

function onPageChange(page) {
  updatePage(page, fetchListDeviceTypes);
}

async function showDeviceTypeModal(id) {
  await showDeviceType(id);

  showModal();
}

async function updateDeviceType() {
  const id = deviceType.value.id;
  const input = omit(deviceType.value, "id");
  const result = await UpdateDeviceType(id, input);

  if (result) {
    await fetchListDeviceTypes();
    hideModal();
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
    fetchListDeviceTypes();
  }
}

onMounted(async () => {
  await fetchListDeviceTypes();
});
</script>

<style lang="scss" scoped>
.device-type-row {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}
</style>
