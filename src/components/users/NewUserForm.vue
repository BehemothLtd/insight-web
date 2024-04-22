<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-start mb-3">
      <label
        for="avatar"
        class="form-label mr-3"
        >Avatar :</label
      >
      <UserAvatarUpload
        :user="userDetail"
        :permission="true"
        @change="onUpdateAvatar"
      />
    </div>
    <div class="row">
      <div class="col-4">
        <div class="mb-3">
          <FormValidator
            name="FullName"
            label="Full Name"
            required
          >
            <input
              class="form-control"
              v-model="userDetail.fullName"
              placeholder="Full Name"
            />
          </FormValidator>
        </div>
      </div>
      <div class="col-4">
        <div class="mb-3">
          <FormValidator
            name="Email"
            label="E-mail"
            required
          >
            <input
              id="email"
              class="form-control"
              v-model="userDetail.email"
              placeholder="domain behemoth.vn, kerberos.jp"
            />
          </FormValidator>
        </div>
      </div>
      <div class="col-4">
        <div class="mb-3">
          <FormValidator
            name="SlackId"
            label="Slack ID"
            required
          >
            <input
              id="slackId"
              class="form-control"
              v-model="userDetail.slackId"
              placeholder="ABCDEFGH"
            />
          </FormValidator>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <FormValidator
            name="About"
            label="About"
          >
            <textarea
              id="about"
              class="form-control"
              v-model="userDetail.about"
              placeholder="Enter something..."
              rows="6"
              max-rows="6"
            />
          </FormValidator>
        </div>
      </div>
    </div>

    <div class="col-12"></div>
  </div>
</template>

<script setup>
const userDetail = defineModel();

async function onUpdateAvatar(value) {
  userDetail.value.avatarKey = value.key;
  userDetail.value.avatarUrl = value.url;
}
</script>
