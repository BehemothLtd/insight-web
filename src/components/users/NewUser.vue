<template>
  <div
    v-if="writePermission"
    class="text-right"
  >
    <button
      type="button"
      class="btn btn-primary waves-effect waves-light"
      @click="showNewUserModal"
    >
      <i class="bx bx-plus-circle font-size-16 align-middle me-2"></i>
      New
    </button>

    <b-modal
      ref="createUserModal"
      centered
      title="New user"
      title-class="font-18"
      hide-footer
      size="lg"
    >
      <NewUserForm></NewUserForm>

      <div class="modal-footer pb-0">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          @click="closeModal"
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="submitNewUser"
        >
          Save
        </button>
      </div>
    </b-modal>

    <b-modal
      ref="newUserInfoModal"
      centered
      title="User Password"
      title-class="font-13"
      hide-footer
    >
      <div
        class="alert alert-danger"
        role="alert"
      >
        <i class="bx bx bx-info-circle"></i>
        This info is only
        <span class="fw-bold text-uppercase">generated once</span>, make sure to
        copy it elsewhere
      </div>

      <div class="card card-body">
        <div class="card-text fw-bold alert alert-success">
          {{ newUserInfo }}
        </div>

        <div>
          <button
            class="cursor-pointer btn btn-success waves-effect waves-light"
            @click="onCopyPassword"
          >
            <i class="mdi mdi-content-copy align-middle me-2"></i> Copy to
            clipboard
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import Toast from "@/ultilities/toast";
import { storeToRefs } from "pinia";

// ==============STORE============
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();

// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");

const writePermission = computed(() => hasPermissionOn("users", "write"));

// =============DATA==========
const createUserModal = ref(null);
const newUserInfoModal = ref(null);
const newUserInfo = ref({});

// const { newUserInfo } = storeToRefs(userStore);

// =============METHODS=========
function showNewUserModal() {
  // userStore.resetUserForm();
  // globalStore.setValidationErrors({});

  createUserModal.value.show();
}

function closeModal() {
  createUserModal.value.hide();
}

async function submitNewUser() {
  await userStore.createUser();

  if (newUserInfo.value) {
    createUserModal.value.hide();
    newUserInfoModal.value.show();
  }
}

function onCopyPassword() {
  navigator.clipboard.writeText(newUserInfo.value);

  Toast.success({ title: "Password is Copied to Clipboard" });
}
</script>
