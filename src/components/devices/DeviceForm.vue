<template>
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
</template>

<script setup>
import { ref, computed } from "vue";
import { selectOptionDeviceState } from "@/utilities/selectOptions.js";

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

const device = defineModel();

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

function changeState() {
  if (["available", "discharged"].includes(device.value.state)) {
    device.value.userId = null;
  }
}
function changeUser() {
  device.value.state = "using";
}
</script>
