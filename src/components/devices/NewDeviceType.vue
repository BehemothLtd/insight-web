<template>
  <div>
    <button
      class="btn btn-primary waves-effect waves-light"
      @click="openModal()"
    >
      <i class="bx bx-plus-circle font-size-16 align-middle me-2"></i>
      New Device Type
    </button>

    <b-modal
      ref="modal"
      title="Update Device Type"
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
            @click="hideModal()"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="createDeviceType"
          >
            Save
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { CreateDeviceType } from "@/apis/repositories";
import useModal from "@/composable/modal";

const { modal, showModal, hideModal } = useModal();

const emits = defineEmits(["submit"]);

const deviceType = ref({});

function openModal() {
  deviceType.value = {};
  showModal();
}
async function createDeviceType() {
  const data = await CreateDeviceType(deviceType.value);

  if (data) {
    hideModal();
    emits("submit");
  }
}
</script>
