<template>
  <div class="row">
    <div class="user-form-container card p-3">
      <div
        class="text-center d-flex align-items-center justify-content-start mb-3 ml-3"
      >
        <UserAvatarUpload
          :user="userDetail"
          :permission="true"
          @change="onUpdateAvatar"
        />
        <div class="user-info d-flex flex-column justify-content-start ml-3">
          <h4 class="mb-1 text-left">
            {{ userDetail.name }}
          </h4>

          <h5 class="mb-1 text-left">
            {{ userDetail.fullName }}
          </h5>

          <p class="text-mute mb-1 text-left">
            {{ `Member since ${filters.fullDate(userDetail.createdAt)}` }}
          </p>
        </div>
      </div>

      <div>
        <UserForm
          v-model="userDetail"
          :email-disable="true"
          :write-permission="true"
        >
          <div class="text-end">
            <b-button
              variant="primary"
              @click="updateProfile"
            >
              Save
            </b-button>
          </div>
        </UserForm>
      </div>
    </div>

    <UserProjectList
      :project-assignees="userDetail.projectAssignees"
    ></UserProjectList>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const userDetail = ref({});

import { FetchSelfInfo, SelfUpdateProfile } from "@/apis/repositories";

async function fetchSelfInfo() {
  const result = await FetchSelfInfo();

  userDetail.value = result.SelfProfile;
}

async function updateProfile() {
  try {
    const result = await SelfUpdateProfile({ input: userDetail.value });

    userDetail.value = result.SelfUpdateProfile.user;
  } catch {}
}

onMounted(async () => {
  await fetchSelfInfo();
});

async function onUpdateAvatar(value) {
  userDetail.value.avatarKey = value.key;
  userDetail.value.avatarUrl = value.url;
}
</script>
