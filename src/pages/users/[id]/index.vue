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
            <router-link
              :to="`/users`"
              type="button"
              class="btn btn-outline-secondary me-2"
            >
              Back
            </router-link>

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
import { useBreadcrumb } from "@bachdx/b-vuse";

const props = defineProps({
  user: Object,
});

// =========== PERMISSION ===========
const hasPermissionOn = inject("hasPermissionOn");
const writePermission = computed(() => hasPermissionOn("users", "write"));

// =========== DATA ===========
const route = useRoute();
const userDetail = ref({});
const userId = ref();

const { setBreadcrumb } = useBreadcrumb();

// =========== FUNCTION ===========
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

setBreadcrumb({
  title: "User",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "User",
      href: "/users",
    },
    {
      text: "Detail",
      active: true,
    },
  ],
});
</script>
