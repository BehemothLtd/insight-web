<template>
  <div class="container-fluid">
    <div class="mb-3">
      <label class="form-label">Current Password :</label>
      <FormValidator name="CurrentPassword">
        <b-form-input
          v-model="userPasswordForm.currentPassword"
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
      <FormValidator name="Password">
        <b-form-input
          v-model="userPasswordForm.password"
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
      <FormValidator name="PasswordConfirmation">
        <b-form-input
          v-model="userPasswordForm.passwordConfirmation"
          type="password"
        ></b-form-input>
      </FormValidator>
    </div>
  </div>
</template>

<script setup>
const userPasswordForm = defineModel();
</script>
