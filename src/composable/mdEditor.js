import "md-editor-v3/lib/style.css";
import "md-editor-v3/lib/preview.css";

// ============STORE================
import { useGlobalStore } from "@/stores/global";

export default function useMdEditor() {
  const toolbars = [
    "bold",
    "underline",
    "italic",
    "-",
    "title",
    "strikeThrough",
    "sub",
    "sup",
    "quote",
    "unorderedList",
    "orderedList",
    "task",
    "-",
    "codeRow",
    "code",
    "table",
    "link",
    "-",
    "image",
    0, // upload video
    "-",
    "=",
    "pageFullscreen",
    "fullscreen",
  ];

  const globalStore = useGlobalStore();

  const onUploadImg = async (files, callback) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files[]", file);
    });

    const res = await globalStore.uploadFiles(formData);

    if (res) {
      callback(res.map((item) => item.url));
    }
  };

  const onUploadFile = async (e) => {
    const files = e.dataTransfer?.files || e.target.files;
    const formData = new FormData();
    const fileType = files[0].type;

    files.forEach((file) => {
      formData.append("files[]", file);
    });

    const res = await globalStore.uploadFiles(formData);

    if (res) {
      const selection = window.getSelection();

      if (!selection.rangeCount) return;

      const fileMarkdown = res
        .map((item) =>
          fileType.includes("video")
            ? `${handleAttrVideo({ src: item.url })}`
            : `![](${item.url})`,
        )
        .join("\r\n");

      selection.deleteFromDocument();

      selection.getRangeAt(0).insertNode(document.createTextNode(fileMarkdown));
      selection.collapseToEnd();
    }
  };

  const handleAttrVideo = (attr) => {
    const width = attr.width || 500;
    const height = attr.height || 300;

    const videoHtml = `<video controls width="${width}" height="${height}" src="${attr.src}"></video>`;

    return videoHtml;
  };

  return {
    // data
    toolbars,

    // methods
    onUploadImg,
    onUploadFile,
  };
}
