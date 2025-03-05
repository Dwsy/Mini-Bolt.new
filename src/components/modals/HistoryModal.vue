<script setup>
import { usePromptStore } from "@/stores/prompt";
import { useNotificationStore } from "@/stores/notification";
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import { useFormatter } from "@/composables/useFormatter";

const emit = defineEmits(["close", "navigate-to-tab"]);

const promptStore = usePromptStore();
const notificationStore = useNotificationStore();
const { formatDate } = useFormatter();

// Methods
const clearHistory = () => {
  if (confirm("确定要清空所有历史记录吗？此操作不可恢复。")) {
    promptStore.clearHistory();
    notificationStore.show("success", "已清空", "历史记录已清空");
  }
};

const removeHistoryItem = (index) => {
  promptStore.removeHistoryItem(index);
  notificationStore.show("success", "已删除", "历史记录项已删除");
};

const useHistoryPrompt = (index) => {
  const historyItem = promptStore.promptHistory[index];

  // 调用store中的方法加载历史提示词
  promptStore.useHistoryPrompt(index);

  // 关闭模态窗口
  emit("close");

  // 发出事件导航到prompt标签页，先展示提示词
  emit("navigate-to-tab", "prompt");

  // 短暂延迟后再导航到files标签，确保界面有足够时间加载提示词
  setTimeout(() => {
    emit("navigate-to-tab", "files");
  }, 300);

  notificationStore.show("success", "已加载", "历史提示词已加载");
};

const copyHistoryPrompt = (index) => {
  const historyItem = promptStore.promptHistory[index];

  navigator.clipboard
    .writeText(historyItem.prompt)
    .then(() => {
      notificationStore.show("success", "复制成功", "历史提示词已复制到剪贴板");
    })
    .catch((err) => {
      notificationStore.show(
        "error",
        "复制失败",
        err.message || "请手动选择文本并复制"
      );
    });
};
</script>

<template>
  <ModalWrapper title="提示词历史记录" @close="emit('close')">
    <div class="p-4 max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar">
      <div
        v-if="promptStore.promptHistory.length === 0"
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>暂无历史记录</p>
        <p class="text-sm mt-1">生成的提示词将自动保存在这里</p>
      </div>

      <div v-else class="space-y-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-base-content/60"
            >共 {{ promptStore.promptHistory.length }} 条记录</span
          >
          <button
            @click="clearHistory"
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
          v-for="(item, index) in promptStore.promptHistory"
          :key="index"
          class="border border-base-300 rounded-md overflow-hidden mb-4"
        >
          <div class="bg-base-300 p-3 flex justify-between items-center">
            <div>
              <div class="font-medium text-primary">
                {{ item.projectName || "未命名项目" }}
              </div>
              <div class="text-xs text-base-content/60 mt-0.5">
                {{ formatDate(item.timestamp) }}
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                @click="useHistoryPrompt(index)"
                class="btn btn-primary btn-sm"
                title="使用此提示词"
              >
                使用此提示词
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
                @click="copyHistoryPrompt(index)"
                class="btn btn-ghost btn-sm"
                title="复制提示词"
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
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  ></path>
                </svg>
              </button>
              <button
                @click="removeHistoryItem(index)"
                class="btn btn-ghost btn-sm hover:btn-error"
                title="删除此记录"
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
          <div
            class="p-3 bg-base-200 max-h-40 overflow-y-auto custom-scrollbar"
          >
            <pre
              class="text-xs text-base-content/80 whitespace-pre-wrap break-words font-mono"
              >{{ item.prompt.substring(0, 300)
              }}{{ item.prompt.length > 300 ? "..." : "" }}</pre
            >
          </div>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>
