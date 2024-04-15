<!-- <template>
  <div class="row">
    <div class="user-form-container card p-3">
      <div
        class="text-center d-flex align-items-center justify-content-start mb-3 ml-3"
      >
        <UserAvatarUpload
          :user="userDetail"
          :permission="writePermission"
          @change="onUpdateAvatar"
        />
        <div class="user-info d-flex flex-column justify-content-start ml-3">
          <h4 class="mb-1 text-left">
            {{ userDetail.name }}
          </h4>

          <h5 class="mb-1 text-left">
            {{ userDetail.fullName }}
          </h5>

          <p class="text-left text-muted mb-1">
            {{ `Member since ${filters.fullDate(userDetail.createdAt)}` }}
          </p>
          <p class="text-left text-muted mb-1">
            <span>{{
              `Active at ${filters.fullDate(userDetail.timingActiveAt)}`
            }}</span>
            <span
              v-if="userDetail.timingInactiveAt"
              class="text-left text-muted mb-1"
            >
              {{
                `: Inactive at ${filters.fullDate(userDetail.timingInactiveAt)}`
              }}
            </span>
          </p>
        </div>
      </div>

      <div>
        <UserForm
          :email-disable="true"
          :can-update-password="true"
          :write-permission="writePermission"
        >
          <div class="text-end">
            <router-link
              :to="`/users`"
              type="button"
              class="btn btn-outline-secondary me-2"
            >
              Back
            </router-link>

            <b-button
              v-if="writePermission"
              variant="primary"
              @click="saveUser"
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
import { onMounted, ref } from "vue";
import { GetUser } from "@/apis/repositories";
import { useQuery, useBreadcrumb } from "@bachdx/b-vuse";
import { useRoute } from "vue-router";

const props = defineProps({
  user: Object,
});

const { setBreadcrumb } = useBreadcrumb();

const route = useRoute();

const user = ref({});

function fetchUser() {
  if (props.user) return (user.value = props.user);
  if (!route.params.id) return;

  user.value = GetUser(route.params.id).User;
}

onMounted(() => {
  fetchUser();
});

setBreadcrumb({
  title: "User",
  items: [
    {
      text: "User",
      active: true,
    },
  ],
});
</script>

<style lang="scss" scoped>
.edit-btn {
  bottom: -3px;
  right: -3px;
  border-radius: 100%;
  padding: 0.27rem 0.45rem;
}
</style> -->

<template>
  <div class="row">
    <div class="user-form-container card p-3">
      <div
        class="text-center d-flex align-items-center justify-content-start mb-3 ml-3"
      >
        <UserAvatarUpload
          :user="userDetail"
          :permission="writePermission"
          @change="onUpdateAvatar"
        />
        <div class="user-info d-flex flex-column justify-content-start ml-3">
          <h4 class="mb-1 text-left">
            {{ userDetail.name }}
          </h4>

          <h5 class="mb-1 text-left">
            {{ userDetail.fullName }}
          </h5>

          <p class="text-left text-muted mb-1">
            {{ `Member since ${filters.fullDate(userDetail.createdAt)}` }}
          </p>
          <p class="text-left text-muted mb-1">
            <span>{{
              `Active at ${filters.fullDate(userDetail.timingActiveAt)}`
            }}</span>
            <span
              v-if="userDetail.timingInactiveAt"
              class="text-left text-muted mb-1"
            >
              {{
                `: Inactive at ${filters.fullDate(userDetail.timingInactiveAt)}`
              }}
            </span>
          </p>
        </div>
      </div>

      <div>
        <UserForm
          v-model="userDetail"
          :email-disable="true"
          :can-update-password="true"
          :write-permission="writePermission"
        >
          <div class="text-end">
            <b-button
              variant="primary"
              @click="updateUser"
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
import { ref, onMounted, inject, computed } from "vue";
import { GetUser, UserUpdate } from "@/apis/repositories";
import { useRoute } from "vue-router";

const props = defineProps({
  user: Object,
});

// =========== PERMISSION ========
const hasPermissionOn = inject("hasPermissionOn");
const writePermission = computed(() => hasPermissionOn("users", "write"));

const route = useRoute();

const userDetail = ref({});
const userId = ref();

async function updateUser() {
  try {
    const result = await UserUpdate(userId.value, userDetail.value);

    userDetail.value = result.UserUpdate.user;
  } catch {}
}

async function fetchUser(id) {
  if (props.user) return (user.value = props.user);
  if (!id) return;

  const result = await GetUser(id);
  userDetail.value = result.User;
}

onMounted(async () => {
  if (route.params.id) {
    userId.value = route.params.id;
  }

  await fetchUser(userId.value);
});

async function onUpdateAvatar(value) {
  userDetail.value.avatarKey = value.key;
  userDetail.value.avatarUrl = value.url;
}
</script>
