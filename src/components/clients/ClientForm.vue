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
                v-model="clientFormData.name"
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
                v-model="clientFormData.showOnHomePage"
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
import { ref } from "vue";
import { CreateClient, UpdateClient } from "@/apis/repositories/clientRepository";
import { cloneDeep, omit } from "lodash";

const emits = defineEmits(["onSubmitForm"]);

const clientFormData = ref({
  id: null,
  name: "",
  showOnHomePage: false,
  lockVersion: 0,
  reset() {
    (this.id = null), (this.name = "");
    this.showOnHomePage = false;
    this.lockVersion = 0;
  },
  createOutput() {
    return omit(this, ["id", "lockVersion"]);
  },
  updateOutput(){
    return {
      id:this.id,
      input: omit(this, ["id"])
    }
  },
  assignAttributes(input) {
    if (input) {
      Object.keys(this).forEach((key) => {
        if (input.hasOwnProperty(key)) this[key] = cloneDeep(input[key]);
      });
    }
  },
});

async function submitForm() {
  let result;

  if (!clientFormData.value.id) {
    result = await CreateClient(clientFormData.value.createOutput());
  } else {
    result = await UpdateClient(clientFormData.value.updateOutput())
  }

  if (result) emits("onSubmitForm"); 
}
async function onUpdateAvatar(value) {
  clientForm.value.avatarKey = value.key;
  clientForm.value.avatarUrl = value.url;
}

defineExpose({
  clientFormData,
});
</script>
