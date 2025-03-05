<script setup>
import { useFileStore } from "@/stores/files";
import { useNotificationStore } from "@/stores/notification";
import FileTree from "@/components/common/FileTree.vue";
import { watch, onMounted, ref, computed } from "vue";

const emit = defineEmits(["select-file"]);

const fileStore = useFileStore();
const notificationStore = useNotificationStore();

const selectFile = (filePath) => {
  fileStore.selectFile(filePath);
  emit("select-file");
};

// 查找 README 文件的方法
const findReadmeFile = () => {
  if (fileStore.parsedFiles.length === 0) return null;

  // 寻找任意写法的 README 文件（忽略大小写）
  const readmeFile = fileStore.parsedFiles.find((file) => {
    // 从文件路径中提取文件名
    const pathParts = file.filePath.split("/");
    const fileName = pathParts[pathParts.length - 1].toLowerCase();
    return fileName.includes("readme");
  });

  return readmeFile ? readmeFile.filePath : null;
};

// 自动打开 README 文件
const openReadmeFile = () => {
  const readmeFilePath = findReadmeFile();
  if (readmeFilePath) {
    selectFile(readmeFilePath);
  }
};

// 监听文件列表变化，自动打开 README
watch(
  () => fileStore.parsedFiles.length,
  (newVal) => {
    if (newVal > 0) {
      openReadmeFile();
    }
  },
  { immediate: true }
);

// 组件挂载时也尝试打开 README
onMounted(() => {
  if (fileStore.parsedFiles.length > 0) {
    openReadmeFile();
  }
});

// Methods
const downloadFiles = async () => {
  if (fileStore.parsedFiles.length === 0) return;

  try {
    const result = await fileStore.downloadFiles();

    if (result.success) {
      notificationStore.show(
        "success",
        "下载成功",
        `${result.fileName} 已开始下载`
      );
    } else {
      notificationStore.show(
        "error",
        "下载失败",
        result.error || "无法下载文件"
      );
    }
  } catch (error) {
    notificationStore.show("error", "下载失败", error.message);
  }
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-primary">项目文件结构</h3>
      <button
        v-if="fileStore.parsedFiles.length > 0"
        @click="downloadFiles"
        class="btn btn-primary btn-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          ></path>
        </svg>
        下载项目文件
      </button>
    </div>

    <div
      v-if="fileStore.parsedFiles.length > 0"
      class="bg-base-200 dark:bg-base-300 rounded-md p-4 max-h-[60vh] overflow-auto custom-scrollbar"
    >
      <FileTree
        :root-name="fileStore.projectInfo.projectName"
        :file-tree="fileStore.fileTree"
        @select-file="selectFile"
      />
    </div>

    <div
      v-else-if="!fileStore.parsedFiles.length"
      class="text-center py-20 text-base-content/40"
    >
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
      <p>请先解析AI返回的代码</p>
    </div>
  </div>
</template>
