<template>
  <div class="row">
    <div class="col-12">
      <!-- <div v-if="hasPermissionOn('clients', 'write')">
        <div class="text-sm-end">
          <button
            type="button"
            class="btn btn-primary waves-effect waves-light mb-2 me-2"
            @click="openModal()"
          >
            <i class="bx bx-plus-circle me-1"></i> New
          </button>
        </div>
      </div> -->

      <BasicDataFilter
        v-if="searchFieldsList.length > 0"
        :search-fields-list="searchFieldsList"
        :query="query"
        @search="fetchClients"
      />

      <ClientsList
        :clients="list"
        @delete="deleteClient"
        @open-detail="openModal"
      />

      <Pagination
        :meta="metadata"
        @change="onPageChange"
      ></Pagination>

      <!-- <b-modal
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
      </b-modal> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useBreadcrumb } from "@bachdx/b-vuse";
import { useGoQuery } from "@bachdx/b-vuse";
import { FetchClients } from "@/apis/repositories/clientRepository";
import useModal from "@/composable/modal";

const { modal, showModal, hideModal } = useModal();

const { setBreadcrumb } = useBreadcrumb();

const query = ref({});

const { goQueryInput, updatePage, updateQuery } = useGoQuery({
  perPage: 10,
  query: query,
});

const list = ref([]);
const metadata = ref({});

async function fetchClients() {
  const result = await FetchClients({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  list.value = result.Clients.collection;
  metadata.value = result.Clients.metadata;
}

function deleteClient() {}

onMounted(async () => {
  await fetchClients();
});

function onPageChange(page) {
  updatePage(page, fetchClients);
}

function onSearch() {
  fetchClients();
}

// ============ STORE ===============
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
const { searchFieldsList, searchComponents } = useDynamicSearch();

searchFieldsList.value = [
  [
    new SearchField(
      "Name",
      "nameCont",
      "mdi mdi-magnify",
      searchComponents.TextInputField,
      {
        classes: "form-control",
      },
    ),
  ],
];

async function openModal(id) {}
// ============ METHODS ===================
</script>
