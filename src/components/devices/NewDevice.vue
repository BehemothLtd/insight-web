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

    <b-tabs v-model="tabIndex">
      <b-tab title="Information">
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
                      v-model="device.name"
                      class="form-control"
                      type="text"
                    />
                  </FormValidator>

                  <FormValidator
                    name="code"
                    label="Code"
                    required
                    class="mt-2"
                  >
                    <input
                      v-model="device.code"
                      class="form-control"
                      type="text"
                    />
                  </FormValidator>

                  <FormValidator
                    name="state"
                    label="State"
                    required
                    class="mt-2"
                  >
                    <el-select-v2
                      v-model="device.state"
                      :options="selectOptionDeviceState"
                      :disabled="deviceDischarged && !!device.id"
                      class="w-100"
                      @change="changeState"
                    ></el-select-v2>
                  </FormValidator>

                  <FormValidator
                    name="userId"
                    label="User"
                    required
                    class="mt-2"
                  >
                    <el-select-v2
                      v-model="selectedUser"
                      :options="userOptions"
                      class="w-100"
                      filterable
                      @change="changeUser"
                    >
                    </el-select-v2>
                  </FormValidator>

                  <FormValidator
                    name="deviceTypeId"
                    label="Device Type"
                    class="mt-2"
                    required
                  >
                    <el-select-v2
                      v-model="device.deviceTypeId"
                      :options="deviceTypeOptions"
                      class="w-100"
                    ></el-select-v2>
                  </FormValidator>

                  <FormValidator
                    name="description"
                    label="Description"
                    class="mt-2"
                  >
                    <input
                      v-model="device.description"
                      class="form-control"
                      type="text"
                    />
                  </FormValidator>

                  <FormValidator
                    name="seller"
                    label="Seller"
                    class="mt-2"
                  >
                    <textarea
                      v-model="device.seller"
                      class="form-control"
                    />
                  </FormValidator>
                </div>
              </div>
            </div>
          </div>
        </form>
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

import { ref, computed } from "vue";
import { selectOptionDeviceState } from "@/utilities/selectOptions.js";
import { CreateDevice } from "@/apis/repositories";

const { modal, showModal, hideModal } = useModal();

const emits = defineEmits(["submit"]);

const props = defineProps({
  deviceTypeOptions: {
    type: Array,
    required: true,
  },
  userOptions: {
    type: Array,
    required: true,
  },
});

const tabIndex = ref(0);
const device = ref({});
const deviceDischarged = ref(false);

const deviceTypeOptions = computed(() => props.deviceTypeOptions);
const userOptions = computed(() => props.userOptions);
const selectedUser = computed({
  get() {
    return userOptions.value.find((item) => item.value == device.value.userId);
  },

  set(newValue) {
    device.value.userId = newValue;
  },
});

function openModal() {
  device.value = {};
  showModal();
}
function changeState() {
  if (["available", "discharged"].includes(device.value.state)) {
    device.value.userId = null;
  }
}
function changeUser() {
  device.value.state = "using";
}
async function createDevice() {
  const data = await CreateDevice(device.value);

  if (data) {
    hideModal();
    emits("submit");
  }
}
</script>

<style lang="scss" scoped>
:deep(.tab-content) {
  margin-top: 20px;
}

:deep(.nav-item) {
  font-weight: 700;
  font-size: 15px;
}
</style>
