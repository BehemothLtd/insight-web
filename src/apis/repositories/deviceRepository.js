import api from "@/apis/axios";

import {
  DeviceTypesGQL,
  DeviceTypeGQL,
  UpdateDeviceTypeGQL,
  DestroyDeviceTypeGQL,
  CreateDeviceTypeGQL,
  DevicesGQL,
} from "@/apis/resolvers";

// Queries
export function FetchDeviceTypes(params = { input: {} }) {
  return api(DeviceTypesGQL, {
    input: params.input,
  });
}

export function FetchDeviceType(id) {
  return api(DeviceTypeGQL, {
    id,
  });
}

export function UpdateDeviceType(id, input) {
  console.log(input);
  return api(UpdateDeviceTypeGQL, {
    id,
    input,
  });
}

export function DestroyDeviceType(id) {
  return api(DestroyDeviceTypeGQL, {
    id,
  });
}

export function CreateDeviceType(input) {
  return api(CreateDeviceTypeGQL, {
    input,
  });
}

export function FetchDeviceList(params = { input: {}, query: {} }) {
  return api(DevicesGQL, {
    input: params.input,
    query: params.query,
  });
}
