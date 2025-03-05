<script setup>
import { useFileStore } from "@/stores/files";
import { useNotificationStore } from "@/stores/notification";
import { useFileUtils } from "@/composables/useFileUtils";
import { useFormatter } from "@/composables/useFormatter";
import ModalWrapper from "@/components/modals/ModalWrapper.vue";

const emit = defineEmits(["close", "navigate-to-tab"]);

const fileStore = useFileStore();
const notificationStore = useNotificationStore();
const { getFileIconUrl } = useFileUtils();
const { formatDate } = useFormatter();

// Methods
const clearParseHistory = () => {
  if (confirm("确定要清空所有解析历史记录吗？此操作不可恢复。")) {
    fileStore.clearParseHistory();
    notificationStore.show("success", "已清空", "解析历史记录已清空");
  }
};

const removeParseHistoryItem = (index) => {
  fileStore.removeParseHistoryItem(index);
  notificationStore.show("success", "已删除", "解析历史记录项已删除");
};

const useParseHistoryItem = (index) => {
  fileStore.useParseHistoryItem(index);
  emit("close");
  emit("navigate-to-tab", "files_preview");
  notificationStore.show(
    "success",
    "已加载",
    `项目 "${fileStore.parseHistory[index].projectName}" 已加载`
  );
};

const downloadParseHistoryItem = async (index) => {
  try {
    const result = await fileStore.downloadParseHistoryItem(index);

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
  <ModalWrapper title="项目解析历史" @close="emit('close')">
    <div class="p-4 max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar">
      <div
        v-if="fileStore.parseHistory.length === 0"
        class="text-center py-12 text-base-content/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 mx-auto mb-3 opacity-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p>暂无解析历史</p>
        <p class="text-sm mt-1">解析的项目将自动保存在这里</p>
      </div>

      <div v-else class="space-y-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-base-content/60"
            >共 {{ fileStore.parseHistory.length }} 个项目</span
          >
          <button
            @click="clearParseHistory"
            class="btn btn-sm btn-error btn-outline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            清空历史
          </button>
        </div>

        <div
          v-for="(item, index) in fileStore.parseHistory"
          :key="index"
          class="border border-base-300 rounded-md overflow-hidden mb-4"
        >
          <div class="bg-base-300 p-3 flex justify-between items-center">
            <div>
              <div class="font-medium text-primary">
                {{ item.projectName || "未命名项目" }}
              </div>
              <div class="text-xs text-base-content/60 mt-0.5">
                {{ formatDate(item.timestamp) }} ·
                {{ item.files.length }} 个文件
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                @click="useParseHistoryItem(index)"
                class="btn btn-primary btn-sm"
                title="使用此项目"
              >
                使用此项目
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
              <button
                @click="downloadParseHistoryItem(index)"
                class="btn btn-success btn-sm"
                title="下载项目文件"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
              </button>
              <button
                @click="removeParseHistoryItem(index)"
                class="btn btn-ghost btn-sm hover:btn-error"
                title="删除记录"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="p-3 bg-base-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div class="text-xs text-base-content/60">
                <div class="font-medium text-primary mb-1">
                  文件列表 ({{ item.files.length }})
                </div>
                <div class="max-h-32 overflow-y-auto custom-scrollbar">
                  <div
                    v-for="file in item.files.slice(0, 10)"
                    :key="file.filePath"
                    class="py-0.5"
                  >
                    <div class="flex items-center">
                      <img
                        v-if="getFileIconUrl(file.fileName)"
                        :src="getFileIconUrl(file.fileName)"
                        :alt="file.fileName"
                        class="h-3 w-3 mr-1"
                      />
                      <img
                        v-else
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                        alt="文件"
                        class="h-3 w-3 mr-1"
                      />
                      <span class="truncate">{{ file.filePath }}</span>
                    </div>
                  </div>
                  <div
                    v-if="item.files.length > 10"
                    class="text-base-content/40 italic mt-1"
                  >
                    还有 {{ item.files.length - 10 }} 个文件未显示...
                  </div>
                </div>
              </div>
              <div v-if="item.parseInput" class="text-xs text-base-content/60">
                <div class="font-medium text-primary mb-1">解析内容预览</div>
                <pre
                  class="bg-base-300 p-2 rounded-md max-h-32 overflow-y-auto custom-scrollbar text-base-content/70 whitespace-pre-wrap break-words"
                  >{{ item.parseInput.substring(0, 200)
                  }}{{ item.parseInput.length > 200 ? "..." : "" }}</pre
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>
