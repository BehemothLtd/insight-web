<template>
  <div>
    <FormValidator
      name="logo"
      label="Logo"
    >
      <button
        class="btn btn-primary"
        @click="openLogoInput"
      >
        <i class="mdi mdi-cloud-upload"></i>
        Upload
      </button>

      <input
        ref="logo"
        type="file"
        style="display: none"
        accept=".jpeg, .jpg, .png"
        @change="uploadLogo"
      />
    </FormValidator>
    <div
      v-if="project.logoUrl"
      class="container"
    >
      <div class="row">
        <div class="col-3 py-4 img-block">
          <img
            class="re-size"
            :src="project.logoUrl"
            alt=""
          />
        </div>
      </div>
    </div>

    <FormValidator
      name="title"
      label="Files"
    >
      <button
        class="btn btn-primary mb-2"
        @click="openFilesInput"
      >
        <i class="mdi mdi-cloud-upload"></i>
        Upload
      </button>
      <input
        ref="files"
        type="file"
        style="display: none"
        multiple
        accept=".jpeg, .jpg, .png"
        @change="uploadFiles"
      />
    </FormValidator>

    <div class="container">
      <div class="row">
        <div
          v-for="image in project.files"
          :key="image.key"
          class="col-3 py-2 img-block"
        >
          <div
            class="btn-delete"
            @click="deleteFile(image)"
          >
            <i
              class="fa fa-times"
              aria-hidden="true"
            ></i>
          </div>
          <img
            class="re-size mb-2"
            :src="image.url"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Upload } from "@/apis/repositories";
import { remove } from "lodash";

const project = defineModel();

const logo = ref({});
const files = ref({});

function openLogoInput() {
  logo.value.click();
}

function openFilesInput() {
  files.value.click();
}

function deleteFile(file) {
  remove(project.value.files, function (f) {
    return f.key == file.key;
  });
}

async function uploadLogo() {
  const formData = new FormData();
  formData.append("files[]", logo.value.files[0]);

  const res = await Upload(formData);

  if (res) {
    project.value.logoUrl = res[0].url;
    project.value.logo.key = res[0].key;
  }
}

async function uploadFiles() {
  const formData = new FormData();

  if (files.value.files.length > 0) {
    [...files.value.files].forEach(async (file) => {
      formData.append("files[]", file);
    });

    const res = await Upload(formData);

    if (res) {
      res.forEach((file) => {
        project.value.files.push({
          url: file.url,
          key: file.key,
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.img-block {
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  padding: 0;
  margin: 10px;
  border-radius: 3px;
}
.re-size {
  width: 100%;
  height: 100%;
  padding: 10px;
  object-fit: cover;
}
.btn-delete {
  width: 30px;
  padding: 5px;
  text-align: center;
  background-color: red;
  border-radius: 3px;
  color: white;
  margin: 5px;
  margin-left: auto;
  cursor: pointer;
}
</style>
