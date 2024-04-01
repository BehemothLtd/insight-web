<template>
  <div class="card overflow-hidden">
    <div class="bg-primary bg-soft">
      <div class="row">
        <div class="col-7">
          <div class="text-primary p-3">
            <h5 class="text-primary">Welcome Back !</h5>
            <p>Behemoth Dashboard</p>
          </div>
        </div>
        <div class="col-5 align-self-end">
          <img
            src="@/assets/images/profile-img.png"
            alt
            class="img-fluid"
          />
        </div>
      </div>
    </div>

    <div class="card-body pt-0">
      <div class="row">
        <div class="col-sm-5">
          <div class="avatar-md profile-user-wid mb-2 avatar-info">
            <UserAvatar
              :user="currentUser"
              avatar-size="avatar-general"
            />
          </div>
          <h5 class="font-size-15 text-truncate-info">
            {{ currentUser.name }}
          </h5>
          <h6 class="font-size-15 text-truncate">
            {{ currentUser.fullName }}
          </h6>
          <p class="text-muted mb-0 text-truncate">
            {{ currentUser.about }}
          </p>
        </div>

        <div class="col-sm-7">
          <div class="pt-4">
            <div class="row">
              <div class="col-6">
                <h5 class="font-size-15">
                  {{ currentUser.projectsCount }}
                </h5>
                <p class="text-muted mb-0">Projects</p>
              </div>
              <div class="col-6">
                <h5 class="font-size-15">{{ currentUser.issuesCount }}</h5>
                <p class="text-muted mb-0">Issues</p>
              </div>
            </div>
            <div class="mt-4">
              <router-link
                to="/profile"
                class="btn btn-primary waves-effect waves-light btn-sm"
              >
                View Profile <i class="mdi mdi-arrow-right ms-1"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";

import UserAvatar from "@/components/molecules/users/UserAvatar.vue";

const authStore = useAuthStore();

const { currentUser } = storeToRefs(authStore);
</script>

<style lang="scss">
.avatar-info {
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
}

.text-truncate-info {
  text-align: left;
}
</style>
