<template>
  <div class="row">
    <div class="col-12">
      <div v-if="writePermission">
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

      <b-modal
        ref="modal"
        size="lg"
        centered
        :title="formTitle"
        hide-footer
      >
        <ClientForm 
        ref="clientFormRef"
        @onSubmitForm="onSubmitForm"
        />
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, inject } from "vue";
import { useBreadcrumb } from "@bachdx/b-vuse";
import { useGoQuery } from "@bachdx/b-vuse";
import {
  FetchClients,
  DeleteClient,
  FetchClient
} from "@/apis/repositories/clientRepository";
import useModal from "@/composable/modal";

const hasPermissionOn = inject("hasPermissionOn");

const Swal = inject("Swal");

const { modal, showModal, hideModal } = useModal();

const { setBreadcrumb } = useBreadcrumb();

const query = ref({});

const { goQueryInput, updatePage, updateQuery } = useGoQuery({
  perPage: 10,
  query: query,
});

const writePermission = computed(() => hasPermissionOn("clients", "write"));

const list = ref([]);
const metadata = ref({});
const clientFormRef = ref(null)
const formTitle = ref("Create")

async function fetchClients() {
  const result = await FetchClients({
    input: goQueryInput.pagyInput,
    query: goQueryInput.query,
  });

  list.value = result.Clients.collection;
  metadata.value = result.Clients.metadata;
}

async function deleteClient(id) {
  const confirmation = await Swal.fire({
    title: "Warning !",
    icon: "warning",
    html: `Do you want to perform this action ?`,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });

  if (confirmation.isConfirmed) {
    await DeleteClient(id);
    refreshList()
  }
}

onMounted(async () => {
  await fetchClients();
  });

function onPageChange(page) {
  updatePage(page, fetchClients);
}

async function openModal(id) {
  if (id) {
    const result = await FetchClient(id);
    formTitle.value = "Update"
    clientFormRef.value.clientFormData.assignAttributes(result.Client)
  } else clientFormRef.value.clientFormData.reset()
  showModal();
}

function refreshList(){
  updateQuery({ page: 1 });

  fetchClients();
}

function onSubmitForm(){
  hideModal();
  refreshList();
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
// ============ METHODS ===================
</script>
