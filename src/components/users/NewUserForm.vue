<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-start mb-3">
      <label
        for="avatar"
        class="form-label mr-3"
        >Avatar :</label
      >
      <UserAvatarUpload
        :user="user"
        :permission="true"
        @change="onUpdateAvatar"
      />
    </div>
    <div class="row">
      <div class="col-4">
        <div class="mb-3">
          <FormValidator
            name="full_name"
            label="Full Name"
            required
          >
            <b-form-input
              v-model="user.fullName"
              placeholder="Full Name"
            ></b-form-input>
          </FormValidator>
        </div>
      </div>
      <div class="col-4">
        <div class="mb-3">
          <FormValidator
            name="email"
            label="E-mail"
            required
          >
            <b-form-input
              id="email"
              v-model="user.email"
              placeholder="domain behemoth.vn, kerberos.jp"
            ></b-form-input>
          </FormValidator>
        </div>
      </div>
      <div class="col-4">
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
            ></b-form-input>
          </FormValidator>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
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
const user = defineModel();

async function onUpdateAvatar(value) {
  user.value.avatarKey = value.key;
  user.value.avatarUrl = value.url;
}
</script>
