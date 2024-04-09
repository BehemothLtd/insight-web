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
    {{ user.birthday }}
    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <FormValidator
            name="fullName"
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
            name="email"
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
            name="phone"
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
            name="address"
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
            name="birthday"
            label="Birthday"
          >
            <DatePicker
              v-model="user.birthday"
              :enable-time-picker="false"
              model-type="yyyy-MM-dd"
              format="yyyy-MM-dd"
              auto-apply
              :disabled="!writePermission"
            />
          </FormValidator>
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <FormValidator
            name="gender"
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
            name="slack_id"
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
            name="state"
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
            name="company_level_id"
            label="Company Level"
          >
            <VSelect
              v-model="user.companyLevelId"
              class="w-100"
              :options="selectOptions.companyLevel"
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
            name="password"
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
            name="about"
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

const selectOptionsState = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const selectOptionsGender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "bisexuality", label: "Bisexuality" },
];

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

async function onUpdateAvatar(value) {
  user.value.avatarKey = value.key;
  user.value.avatarUrl = value.url;
}

onMounted(() => {
  user.value.name = "Avatar";
});
</script>
