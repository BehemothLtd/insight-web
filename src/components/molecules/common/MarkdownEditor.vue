<template>
  <MdEditor
    language="en-US"
    :toolbars="toolbars"
    v-bind="editorOptions"
    class="issue-editor"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
    @on-upload-img="onUploadImg"
  >
    <template #defToolbars>
      <NormalToolbar title="upload video">
        <template #trigger>
          <label
            v-b-tooltip.hover="'Attach video'"
            class="video-icon"
            for="file-input"
          >
            <i class="mdi mdi-video-box font-size-18"></i>
          </label>

          <input
            id="file-input"
            type="file"
            accept="video/mp4, .mov"
            style="display: none"
            @change="onUploadFile"
          />
        </template>
      </NormalToolbar>
    </template>
  </MdEditor>
</template>

<script setup>
import { ref, onMounted } from "vue";

import useMdEditor from "@/composable/mdEditor";
const { toolbars, onUploadImg, onUploadFile } = useMdEditor();

// =============PROPS==========
defineProps({
  editorOptions: {
    type: Object,
    default: () => {},
  },
});

// =============COMPONENT==========
import { MdEditor, NormalToolbar } from "md-editor-v3";

const isDragging = ref(false);

// =============METHODS==========
function dragover(e) {
  e.preventDefault();
  isDragging.value = true;
}
function dragleave() {
  isDragging.value = false;
}
function drop(e) {
  e.preventDefault();
  onUploadFile(e);
  isDragging.value = false;
}

function onPaste(event) {
  event.preventDefault();
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  let paste = (event.clipboardData || window.clipboardData).getData("text");

  const selection = window.getSelection();

  if (urlRegex.test(paste)) {
    // Get text mouse selected
    let selectedText = selection.toString();
    if (!selectedText) selectedText = paste;

    paste = `[${selectedText}](${paste})`;
  }

  if (!selection.rangeCount) return;

  selection.deleteFromDocument();

  selection.getRangeAt(0).insertNode(document.createTextNode(paste));
  selection.collapseToEnd();
}

onMounted(() => {
  const mdEditors = document.querySelectorAll("div.cm-content");

  mdEditors.forEach((item) => {
    if (
      item.getAttribute("contenteditable") != "true" ||
      item.getAttribute("pasteEventExists")
    )
      return;

    item.addEventListener("paste", (event) => onPaste(event), true);
    item.setAttribute("pasteEventExists", true);
  });
});
</script>

<style lang="scss" scoped>
.issue-editor {
  height: 700px;
}
.video-icon {
  cursor: pointer;
  margin-bottom: 0 !important;
}
</style>
