import api from "@/apis/axios";

import { ClientsGQL, ClientGQL } from "@/apis/resolvers";
import { ClientDeleteGQL, ClientCreateGQL, ClientUpdateGQL } from "@/apis/mutations";

export function FetchClients(params = { input: {}, query: {} }) {
  return api(ClientsGQL, {
    input: params.input,
    query: params.query,
  });
}

export function FetchClient(id) {
  return api(ClientGQL, {
    id,
  });
}

export function DeleteClient(id) {
  return api(
    ClientDeleteGQL,
    {
      id,
    },
    { toast: true },
  );
}

export function CreateClient(input) {
  return api(
    ClientCreateGQL,
    {
      input,
    },
    { toast: true },
  );
}

export function UpdateClient({id,input}) {
  return api(
    ClientUpdateGQL,
    {
      id,
      input,
    },
    { toast: true },
  );
}
