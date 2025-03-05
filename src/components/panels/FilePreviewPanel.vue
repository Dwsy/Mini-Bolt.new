<script setup>
import { computed } from "vue";
import { useFileStore } from "@/stores/files";
import { useNotificationStore } from "@/stores/notification";
import { useFileUtils } from "@/composables/useFileUtils";
import { useHighlighter } from "@/composables/useHighlighter";
import { ref } from "vue";

const emit = defineEmits(["preview-markdown"]);

const fileStore = useFileStore();
const notificationStore = useNotificationStore();
const { getFileIconUrl, getLanguage, isMarkdownFile } = useFileUtils();
const highlighter = useHighlighter();

// 当前选中的文件内容和类型
const currentFileContent = ref("");
const currentFileType = ref("");

// Computed properties
const selectedFile = computed(() => fileStore.selectedFile);

// 高亮处理后的内容
const highlightedContent = computed(() => {
  if (!selectedFile.value?.content) return "";

  // 获取文件类型并确定语言
  const fileExtension = selectedFile.value.fileName
    .split(".")
    .pop()
    .toLowerCase();
  currentFileType.value = fileExtension;
  const language = getLanguageFromFileType(fileExtension);

  // 调用highlighter进行高亮处理
  return highlighter.highlight(selectedFile.value.content, language);
});

// 根据文件扩展名确定语言类型
const getLanguageFromFileType = (fileType) => {
  const extensionMap = {
    js: "javascript",
    ts: "javascript",
    jsx: "javascript",
    tsx: "javascript",
    vue: "html",
    html: "html",
    css: "css",
    scss: "css",
    py: "python",
    md: "markdown",
  };

  return extensionMap[fileType] || "";
};

// Methods
const copyFileContent = () => {
  if (!selectedFile.value) return;

  navigator.clipboard
    .writeText(selectedFile.value.content)
    .then(() => {
      notificationStore.show("success", "复制成功", "文件内容已复制到剪贴板");
    })
    .catch((err) => {
      notificationStore.show(
        "error",
        "复制失败",
        err.message || "请手动选择文本并复制"
      );
    });
};

const openMarkdownPreview = () => {
  if (!selectedFile.value || !isMarkdownFile(selectedFile.value.fileName))
    return;
  emit("preview-markdown", selectedFile.value.content);
};
</script>

<template>
  <div class="space-y-4">
    <div v-if="selectedFile" class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-primary truncate">
          {{ selectedFile.fileName }}
        </h3>
        <div class="flex items-center space-x-2">
          <span class="badge badge-outline text-xs px-2 py-1 flex items-center">
            <img
              v-if="getFileIconUrl(selectedFile.fileName)"
              :src="getFileIconUrl(selectedFile.fileName)"
              :alt="getLanguage(selectedFile.fileName)"
              class="h-3 w-3 mr-1.5"
            />
            {{ getLanguage(selectedFile.fileName) }}
          </span>

          <!-- Markdown预览按钮 -->
          <button
            v-if="isMarkdownFile(selectedFile.fileName)"
            @click="openMarkdownPreview"
            class="btn btn-sm btn-secondary"
            title="Markdown预览"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 9h1m4 0h1m-1 4h-1m-3 0H9"
              />
            </svg>
          </button>

          <button @click="copyFileContent" class="btn btn-sm btn-neutral">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        class="bg-base-200 dark:bg-base-300 rounded-md overflow-auto custom-scrollbar max-h-[60vh] text-sm"
      >
        <!-- 文件内容展示区域，带有高亮 -->

        <table class="w-full">
          <tbody>
            <tr
              v-for="(line, index) in selectedFile.content.split('\n')"
              :key="index"
            >
              <td
                class="text-right pr-3 select-none text-gray-500 dark:text-gray-400 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 w-[50px] px-2"
              >
                {{ index + 1 }}
              </td>
              <td class="pl-4 font-mono whitespace-pre">{{ line }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="text-center py-20 text-base-content/40">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto mb-4 opacity-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        ></path>
      </svg>
      <p>请先解析AI返回的代码，然后选择一个文件预览</p>
    </div>
  </div>
</template>
