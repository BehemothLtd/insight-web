import { defineStore } from "pinia";

import { ref } from "vue";

import clientsRepository from "@/repositories/clientRepository";

export const useClientStore = defineStore("client", () => {
  const clients = ref([]);

  async function fetchClients() {
    const result = await clientsRepository().list();

    clients.value = result.data.mpClients;
  }

  return {
    // DATA
    clients,

    // FUNCTION
    fetchClients,
  };
});
