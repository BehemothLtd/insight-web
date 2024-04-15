<template>
  <div class="row">
    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-sm-3">
            <div class="d-flex align-items-center justify-content-start mb-3">
              <!-- <UserAvatarUpload
                :user="clientForm"
                btn-type="mdi mdi-pencil"
                permission
                @change="onUpdateAvatar"
              /> -->
            </div>
          </div>
          <div class="col-sm-9">
            <FormValidator
              name="name"
              label="Name"
              required
            >
              <input
                v-model="clientForm.name"
                class="form-control"
                type="text"
                placeholder="Client Name"
              />
            </FormValidator>
            <FormValidator
              class="mt-3"
              name="show_on_home_page"
              label="Show on home page"
              required
            >
              <b-form-checkbox
                v-model="clientForm.showOnHomePage"
                switch
                class="form-control"
              ></b-form-checkbox>
            </FormValidator>
          </div>
        </div>

        <div class="row text-end">
          <div>
            <button
              type="button"
              class="btn btn-primary w-md"
              @click="submitForm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useClientStore } from "@/stores/client";
const clientStore = useClientStore();

import { storeToRefs } from "pinia";

const { clientForm } = storeToRefs(clientStore);
const emits = defineEmits(["create", "update"]);

function submitForm() {
  if (clientForm.value.id) emits("update", clientForm.value.id);
  else emits("create");
}
async function onUpdateAvatar(value) {
  clientForm.value.avatarKey = value.key;
  clientForm.value.avatarUrl = value.url;
}
</script>
