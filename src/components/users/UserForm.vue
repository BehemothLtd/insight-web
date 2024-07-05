<template>
  <div class="container-fluid">
    <div
      v-if="!emailDisable"
      class="d-flex align-items-center justify-content-start mb-3"
    >
      <label
        for="avatar"
        class="form-label mr-3"
        >Avatar :</label
      >
      <UserAvatarUpload
        btn-type="mdi mdi-plus"
        :user="user"
        @change="onUpdateAvatar"
      />
    </div>
    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <FormValidator
            name="FullName"
            label="Full Name"
            required
          >
            <b-form-input
              v-model="user.fullName"
              placeholder="Full Name"
              :disabled="!writePermission"
            ></b-form-input>
          </FormValidator>
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <FormValidator
            name="Email"
            label="E-mail"
            required
          >
            <b-form-input
              id="email"
              v-model="user.email"
              :disabled="emailDisable || !writePermission"
              placeholder="domain behemoth.vn, kerberos.jp"
            ></b-form-input>
          </FormValidator>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <FormValidator
            name="Phone"
            label="Phone"
          >
            <b-form-input
              v-model="user.phone"
              placeholder="Phone"
              :disabled="!writePermission"
            ></b-form-input>
          </FormValidator>
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <FormValidator
            name="Address"
            label="Address"
          >
            <b-form-input
              v-model="user.address"
              placeholder="Address"
              :disabled="!writePermission"
            ></b-form-input>
          </FormValidator>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <FormValidator
            name="Birthday"
            label="Birthday"
          >
            <DatePicker
              v-model="user.birthday"
              :enable-time-picker="false"
              model-type="dd-MM-yyyy"
              format="dd-MM-yyyy"
              auto-apply
              :disabled="!writePermission"
            />
          </FormValidator>
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <FormValidator
            name="Gender"
            label="Gender"
          >
            <VSelect
              v-model="user.gender"
              class="w-100"
              :options="selectOptionsGender"
              :reduce="(option) => option.value"
              :disabled="!writePermission"
            >
            </VSelect>
          </FormValidator>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <FormValidator
            name="SlackId"
            label="Slack ID"
            required
          >
            <b-form-input
              id="slackId"
              v-model="user.slackId"
              placeholder="ABCDEFGH"
              :disabled="!writePermission"
            ></b-form-input>
          </FormValidator>
        </div>
      </div>
      <div
        v-if="canUpdatePassword"
        class="col-6"
      >
        <div class="mb-3">
          <FormValidator
            name="State"
            label="Active"
            required
          >
            <VSelect
              v-model="user.state"
              class="w-100"
              :options="selectOptionsState"
              :reduce="(option) => option.value"
              :disabled="!writePermission"
            >
            </VSelect>
          </FormValidator>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-if="canUpdatePassword"
        class="col-md-6"
      >
        <div class="mb-3">
          <FormValidator
            name="companyLevelId"
            label="Company Level"
          >
            <VSelect
              v-model="user.companyLevelId"
              class="w-100"
              :options="companyLevelOptions"
              :reduce="(option) => option.value"
              :disabled="!writePermission"
            >
            </VSelect>
          </FormValidator>
        </div>
      </div>
      <div
        v-if="canUpdatePassword"
        class="col-md-6"
      >
        <div class="mb-3">
          <FormValidator
            name="Password"
            label="Password"
          >
            <b-form-input
              v-model="user.password"
              type="password"
              :disabled="!writePermission"
            ></b-form-input>
          </FormValidator>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <FormValidator
            name="About"
            label="About"
          >
            <b-form-textarea
              id="about"
              v-model="user.about"
              placeholder="Enter something..."
              rows="6"
              max-rows="6"
              :disabled="!writePermission"
            ></b-form-textarea>
          </FormValidator>
        </div>
      </div>
    </div>

    <div class="col-12">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import {
  selectOptionsState,
  selectOptionsGender,
} from "@/utilities/selectOptions.js";
import { CompanyLevels } from "@/constants";
import { computed } from "vue";

defineProps({
  emailDisable: {
    type: Boolean,
    default: false,
  },

  canUpdatePassword: {
    type: Boolean,
    default: false,
  },

  writePermission: {
    type: Boolean,
    default: false,
  },
});

const user = defineModel();
const companyLevelOptions = computed(() => {
  return CompanyLevels.map((cl) => {
    return { value: String(cl.id), label: cl.title };
  });
});

async function onUpdateAvatar(value) {
  user.value.avatarKey = value.key;
  user.value.avatarUrl = value.url;
}

onMounted(() => {
  user.value.name = "Avatar";
});
</script>
