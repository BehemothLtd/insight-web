<template>
  <div>
    <b-card header-class="d-flex align-items-center justify-content-between">
      <template
        v-if="searchTitle"
        #header
      >
        <div class="card-title mb-0 py-1">
          {{ searchTitle }}
        </div>
      </template>

      <div class="">
        <div
          v-for="(row, index) in searchFieldsList"
          :key="index"
          class="row"
        >
          <div
            v-for="searchField in row"
            :key="searchField.ransacker"
            :class="`col-xl-${Math.floor(12 / row.length)}`"
          >
            <div class="form-group">
              <component
                :is="searchField.component"
                ref="childs"
                v-model="props.query[searchField.ransacker]"
                :title="searchField.title"
                :options="searchField.options"
                :classes="searchField.options.classes"
                @updated="(value) => onUpdated(searchField, value)"
              />
              <i :class="searchField.icon"></i>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="submit-area row px-0 align-items-left">
          <div class="text-end">
            <slot> </slot>

            <button
              name="button"
              variant="light"
              class="btn btn-outline-primary"
              @click="clear"
            >
              Clear
            </button>

            <button
              name="button"
              class="btn btn-primary ml-2"
              @click="onSearch"
            >
              Search
            </button>
          </div>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  searchFieldsList: {
    type: Array,
    required: true,
  },
  query: {
    type: Object,
    required: true,
  },
  searchTitle: {
    type: String,
    default: "Search",
    required: false,
  },
});

const emits = defineEmits(["reset", "search"]);
const childs = ref(null);

props.searchFieldsList.forEach((listOfField) => {
  const routeQuery = route.query;

  listOfField.forEach((field) => {
    const propsQuery = props.query;
    const ransacker = field.ransacker;
    const fieldOptions = field.options;

    if (!routeQuery[ransacker])
      propsQuery[ransacker] = fieldOptions?.defaultValue;
    else if (fieldOptions?.parseMethod) {
      const method = fieldOptions.parseMethod;

      propsQuery[ransacker] = method(routeQuery[ransacker]);
    } else propsQuery[ransacker] = routeQuery[ransacker];
  });
});

function onUpdated(searchField, value) {
  props.query[searchField.ransacker] = value;
}

function clear() {
  childs.value.forEach((child) => {
    child.clear();
  });

  router.push({ query: {}, hash: route.hash });
}

function onSearch() {
  router.push({ query: props.query, hash: route.hash });

  emits("search");
}
</script>
<style lang="scss" scoped>
:deep(.card-header) {
  background-color: #eff2f7;
}

:deep(.card-body) {
  padding: 1.25rem 1.25rem 0;
}

:deep(.card-footer) {
  background-color: white;
}

.form-group {
  position: relative;

  .form-control {
    padding: 0 40px;
    min-height: 40px;
    font-size: 13px;
    &::placeholder {
      color: lightgray;
    }
  }

  i {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #a8a8a8;
    background-color: white;
    line-height: normal;
    font-size: 24px;
  }
}

// .btn {
//   &.btn-search {
//     color: white;
//     background-color: #556ee6;
//     border: none;
//     // padding: 10px 25px;
//   }
//   &.btn-clear {
//     color: #556ee6 !important;
//     background-color: transparent;
//     border: 1px solid #556ee6;
//     // padding: 9px 25px;
//     &:active {
//       background-color: transparent;
//       outline: none;
//     }
//   }
// }
</style>
