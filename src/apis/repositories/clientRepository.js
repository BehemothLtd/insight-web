import api from "@/apis/axios";

import { ClientsGQL } from "@/apis/resolvers";

export function FetchClients(params = {input: {},query: {}}){
  return api(ClientsGQL,{
    input: params.input,
    query: params.query
  })
}
