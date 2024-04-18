<template>
  <div class="container-fluid">
    <div class="mb-3">
      <label class="form-label">Current Password :</label>
      <FormValidator name="current_password">
        <b-form-input
          v-model="changePasswordForm.currentPassword"
          type="password"
        ></b-form-input>
      </FormValidator>
    </div>
    <div class="mb-3">
      <label
        for="email"
        class="form-label"
        >Password :</label
      >
      <FormValidator name="password">
        <b-form-input
          v-model="changePasswordForm.password"
          type="password"
        ></b-form-input>
      </FormValidator>
    </div>
    <div class="mb-3">
      <label
        for="email"
        class="form-label"
        >Password Confirmation :</label
      >
      <FormValidator name="password_confirmation">
        <b-form-input
          v-model="changePasswordForm.passwordConfirmation"
          type="password"
        ></b-form-input>
      </FormValidator>
    </div>
  </div>
</template>

<script setup>
const changePasswordForm = defineModel();
</script>
