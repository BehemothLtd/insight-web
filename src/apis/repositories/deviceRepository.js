import api from "@/apis/axios";

import {
  DeviceTypesGQL,
  DeviceTypeGQL,
  DevicesGQL,
  DeviceGQL,
} from "@/apis/resolvers";
import {
  UpdateDeviceTypeGQL,
  DestroyDeviceTypeGQL,
  CreateDeviceTypeGQL,
  DestroyDeviceGQL,
  CreateDeviceGQL,
  UpdateDeviceGQL,
} from "@/apis/mutations";

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

export function DestroyDevice(id) {
  return api(DestroyDeviceGQL, {
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

export function CreateDevice(input) {
  return api(CreateDeviceGQL, {
    input,
  });
}

export function FetchDevice(id) {
  return api(DeviceGQL, {
    id,
  });
}

export function UpdateDevice(id, input) {
  return api(UpdateDeviceGQL, {
    id,
    input,
  });
}
