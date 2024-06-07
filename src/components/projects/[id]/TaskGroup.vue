<template>
  <div class="group-container full-flex flex-column">
    <draggable
      :list="tasks"
      class="drag-group full-flex flex-column"
      group="tasks"
      item-key="name"
      v-bind="dragOptions"
      @change="changePositionBoard"
    >
      <template #item="{ element }">
        <TaskCard
          :issue="element"
          @click="$emit('show', element.id)"
        />
      </template>
    </draggable>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

// ===========COMPONENTS========
import draggable from "vuedraggable";

const emits = defineEmits(["show", "changePosition"]);

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },

  statusId: {
    type: String,
    default: null,
  },
});

const route = useRoute();

const dragOptions = ref({
  animation: 150,
  group: "tasks",
  ghostClass: "ghost",
});

function changePositionBoard(event) {
  if (event.hasOwnProperty("removed")) return;

  const eventAdd = event.added;
  const eventMove = event.moved;

  const isAdd = event.hasOwnProperty("added");

  const projectId = route.params.id;
  const element = isAdd ? eventAdd.element : eventMove.element;
  const newIndex = isAdd ? eventAdd.newIndex : eventMove.newIndex;
  const newStatusId = isAdd ? props.statusId : null;

  const input = {
    id: element.id,
    projectId: projectId,
    newIndex: newIndex.toString(),
    newStatusId: newStatusId,
  };

  emits("changePosition", input);
}
</script>
