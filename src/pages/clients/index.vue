<template>
  <div class="row">
    <div class="col-12">
      <div v-if="hasPermissionOn('clients', 'write')">
        <div class="text-sm-end">
          <button
            type="button"
            class="btn btn-primary waves-effect waves-light mb-2 me-2"
            @click="openModal()"
          >
            <i class="bx bx-plus-circle me-1"></i> New
          </button>
        </div>
      </div>

      <BasicDataFilter
        :search-fields-list="searchFieldsList"
        :query="queryInput.q"
        @search="searchList"
        @reset="resetQuerySearch"
      />

      <ClientsList
        :clients="clients"
        @delete="deleteClient"
        @open-detail="openModal"
      />

      <Pagination
        :meta="metadata"
        @change="onPageChange"
      ></Pagination>

      <b-modal
        ref="modal"
        size="lg"
        centered
        :title="`Client ${clientForm.id ? 'Update' : 'Create'}`"
        hide-footer
      >
        <ClientForm
          @create="create"
          @update="update"
        />
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBreadcrumb } from "@bachdx/b-vuse";
const { setBreadcrumb } = useBreadcrumb();
import useModal from "@/composable/modal";
const { modal, showModal, hideModal } = useModal();

// ============ STORE ===============
import { useClientStore } from "@/stores/client";

import SearchField from "@/types/searchField";
import useDynamicSearch from "@/composable/dynamicSearch";

setBreadcrumb({
  title: "Client List",
  items: [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Clients",
      href: "/clients",
    },
    {
      text: "List",
      active: true,
    },
  ],
});

// ============ DATA ====================
const clientStore = useClientStore();
const { clients, metadata, queryInput, clientForm } = storeToRefs(clientStore);
const { searchFieldsList, searchComponents } = useDynamicSearch();

searchFieldsList.value = [
  [
    new SearchField(
      "Name",
      "name_cont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
      {
        classes: "form-control",
      },
    ),
  ],
];

// ============ METHODS ===================
onMounted(() => {
  searchList();
});

function onPageChange(page) {
  clientStore.updateQuery({ page: page });
  clientStore.fetchListClients();
}

function searchList() {
  clientStore.updateQuery({ page: 1 });
  refetchList();
}

function refetchList() {
  clientStore.fetchListClients();
}

function resetQuerySearch() {
  clientStore.updateQuery({ q: {} });
  refetchList();
}

function deleteClient(id) {
  clientStore.updateQuery({ page: 1 });
  clientStore.destroyClient(id);
}

async function openModal(id) {
  clientStore.resetClientForm();
  if (id) await clientStore.fetchClientDetail(id);
  showModal();
}

async function create() {
  await clientStore.createClient();
  await clientStore.fetchListClients();
  hideModal();
}
async function update(id) {
  await clientStore.updateClient(id);
  searchList();
  hideModal();
}
</script>
