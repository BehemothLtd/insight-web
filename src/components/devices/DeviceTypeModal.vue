<template>
  <b-modal
    :title="title"
    title-class="font-18"
  >
    <form class="outer-repeater">
      <div
        data-repeater-list="outer-group"
        class="outer"
      >
        <div
          data-repeater-item
          class="outer"
        >
          <div class="form-group row mb-4">
            <div class="col-lg-12">
              <FormValidator
                name="name"
                label="Name"
                required
              >
                <input
                  v-model="deviceType.name"
                  class="form-control"
                  type="text"
                />
              </FormValidator>
            </div>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <div class="modal-footer pb-0 border-0">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="$emit('submit')"
        >
          Save
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useDeviceTypesStore } from "@/stores/deviceTypes";

defineProps({
  title: {
    type: String,
    default: "",
  },
});

defineEmits(["submit", "close"]);

const deviceTypesStore = useDeviceTypesStore();

const { deviceType } = storeToRefs(deviceTypesStore);
</script>
