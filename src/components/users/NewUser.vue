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
      <NewUserForm v-model="userDetail" />

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
          {{ userInfo }}
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
import { UserCreate, FetchUsers } from "@/apis/repositories";
import { useGoQuery } from "@bachdx/b-vuse";
import Toast from "@/ultilities/toast";

// ===========PERMISSION========
const hasPermissionOn = inject("hasPermissionOn");
const writePermission = computed(() => hasPermissionOn("users", "write"));

// =============DATA==========
const createUserModal = ref(null);
const newUserInfoModal = ref(null);
const userInfo = ref(null);

const userDetail = ref({});
const { goQueryInput } = useGoQuery({
  perPage: 10,
  query: {},
});

// =============METHODS=========
function showNewUserModal() {
  createUserModal.value.show();
}

function closeModal() {
  createUserModal.value.hide();
}

async function submitNewUser() {
  const result = await UserCreate(userDetail.value);

  if (result) {
    userInfo.value = result.UserCreate;

    createUserModal.value.hide();
    newUserInfoModal.value.show();

    FetchUsers({
      input: goQueryInput.pagyInput,
      query: goQueryInput.query,
    });
  }
}

function onCopyPassword() {
  navigator.clipboard.writeText(userInfo.value);

  Toast.success({ title: "Password is Copied to Clipboard" });
}
</script>
