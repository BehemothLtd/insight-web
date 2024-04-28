<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">{{ title }}</h4>
      <div class="mb-3">
        <FormValidator
          name="UserId"
          label="Name"
          required
        >
          <VSelect
            v-model="form.userId"
            class="w-100"
            :options="userOptions"
            :reduce="(option) => option.value"
            label="label"
            :disabled="!writePermission"
          >
            <template #selected-option="value">
              {{ setSelectedOption(userOptions, value) }}
            </template>
          </VSelect>
        </FormValidator>
      </div>

      <div class="mb-3">
        <FormValidator
          name="DevelopmentRoleId"
          label="Role"
          required
        >
          <VSelect
            v-model="form.developmentRoleId"
            class="w-100"
            :options="developmentRoleOptions"
            :reduce="(option) => option.value"
            :disabled="!writePermission"
          >
            <template #selected-option="value">
              {{ setSelectedOption(developmentRoleOptions, value) }}
            </template>
          </VSelect>
        </FormValidator>
      </div>

      <div class="mb-3">
        <FormValidator
          v-if="writePermission"
          name="Active"
          label="Active State"
          required
        >
          <div class="form-check form-switch form-switch-lg mb-3">
            <input
              v-model="form.active"
              class="form-check-input"
              type="checkbox"
              :true-value="true"
              :false-value="false"
            />
          </div>
        </FormValidator>

        <div v-else>
          <label>State</label>

          <BadgeLabel
            :text="form.active ? 'Active' : 'Inactive'"
            :color="form.active ? 'green' : 'gray'"
            :extra-classes="['ms-1']"
          />
        </div>
      </div>

      <div class="form-group row mb-3">
        <div class="col-lg-6">
          <FormValidator
            label="Join Date"
            name="JoinDate"
            required
          >
            <DatePicker
              v-model="form.joinDate"
              :enable-time-picker="false"
              :disabled="!writePermission"
              model-type="dd-MM-yyyy"
            />
          </FormValidator>
        </div>

        <div
          v-if="!form.active"
          class="col-lg-6"
        >
          <FormValidator
            label="Leave Date"
            name="LeaveDate"
          >
            <DatePicker
              v-model="form.leaveDate"
              :enable-time-picker="false"
              :disabled="!writePermission"
              model-type="dd-MM-yyyy"
            />
          </FormValidator>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { FetchSelectOptions } from "@/apis/repositories";

import { setSelectedOption } from "@/utilities/helpers";

defineProps({
  title: {
    type: String,
    required: true,
  },
  writePermission: {
    type: Boolean,
    default: false,
  },
});

const form = defineModel();
const userOptions = ref([]);
const developmentRoleOptions = ref([]);

onMounted(async () => {
  const result = await FetchSelectOptions(["user", "developmentRole"]);

  if (result.SelectOptions) {
    userOptions.value = result.SelectOptions.UserOptions;
    developmentRoleOptions.value = result.SelectOptions.DevelopmentRoleOptions;
  }
});
</script>
