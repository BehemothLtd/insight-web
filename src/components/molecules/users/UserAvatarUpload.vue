<template>
  <div>
    <UserAvatar
      :user="user"
      :avatar-size="avatarSize"
    >
      <b-button
        v-if="permission"
        variant="primary"
        class="position-absolute btn-upload"
        @click="openFileInput"
      >
        <i
          class="font-size-12"
          :class="btnType"
        ></i>
      </b-button>
    </UserAvatar>

    <input
      ref="file"
      type="file"
      accept=".jpeg, .jpg, .png"
      style="display: none"
      @change="upload"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Upload } from "@/apis/repositories";

defineProps({
  user: {
    type: Object,
    required: true,
  },
  btnType: {
    type: String,
    default: "mdi mdi-pencil",
  },

  permission: {
    type: Boolean,
    default: false,
  },
  avatarSize: {
    type: String,
    default: "avatar-lg",
  },
});

const file = ref({});

function openFileInput() {
  file.value.click();
}

const emits = defineEmits(["change"]);

async function upload() {
  const formData = new FormData();
  formData.append("files[]", file.value.files[0]);

  const res = await Upload(formData);
  emits("change", res[0]);
}
</script>

<style lang="scss" scoped>
.btn-upload {
  bottom: -3px;
  right: -3px;
  border-radius: 100%;
  padding: 0.27rem 0.45rem;
}
</style>
