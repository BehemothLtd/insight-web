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
              v-model="userDetail.fullName"
              class="form-control"
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
              v-model="userDetail.email"
              class="form-control"
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
              v-model="userDetail.slackId"
              class="form-control"
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
              v-model="userDetail.about"
              class="form-control"
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
