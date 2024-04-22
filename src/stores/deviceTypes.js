import { defineStore } from "pinia";
import { ref } from "vue";
import {
  FetchDeviceTypes,
  FetchDeviceType,
  UpdateDeviceType,
  CreateDeviceType,
} from "@/apis/repositories";
import { omit } from "lodash";
import { useGoQuery } from "@bachdx/b-vuse";

export const useDeviceTypesStore = defineStore("deviceTypes", () => {
  const deviceType = ref({});
  const deviceTypes = ref([]);
  const metadata = ref({});

  const { goQueryInput } = useGoQuery({
    perPage: 20,
  });

  async function fetchListDeviceTypes() {
    const result = await FetchDeviceTypes({
      input: goQueryInput.pagyInput,
    });

    deviceTypes.value = result.DeviceTypes.collection;
    metadata.value = result.DeviceTypes.metadata;
  }

  async function showDeviceType(id) {
    const result = await FetchDeviceType(id);

    deviceType.value = result.DeviceType;
  }

  function updateDeviceType() {
    const id = deviceType.value.id;
    const input = omit(deviceType.value, "id");

    return UpdateDeviceType(id, input);
  }

  function newDeviceType() {
    deviceType.value = {
      name: null,
    };
  }

  function createDeviceType() {
    const input = deviceType.value;

    return CreateDeviceType(input);
  }

  return {
    deviceType,
    deviceTypes,
    fetchListDeviceTypes,
    showDeviceType,
    updateDeviceType,
    newDeviceType,
    createDeviceType,
  };
});
