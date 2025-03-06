<script setup>
import { ref, computed, watch, defineExpose } from "vue";
import { useFileStore } from "@/stores/files";
import { usePromptStore } from "@/stores/prompt";
import { useNotificationStore } from "@/stores/notification";
import GuidePanel from "@/components/panels/GuidePanel.vue";
import PromptPanel from "@/components/panels/PromptPanel.vue";
import ParsePanel from "@/components/panels/ParsePanel.vue";
import FilesPanel from "@/components/panels/FilesPanel.vue";
import FilePreviewPanel from "@/components/panels/FilePreviewPanel.vue";

// 接收从父组件传入的navigate-to-tab参数
const props = defineProps({
  navigateToTab: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["preview-markdown"]);

const fileStore = useFileStore();
const promptStore = usePromptStore();
const notificationStore = useNotificationStore();

// Active tab state
const activeTab = ref("prompt");

// 指南显示状态
const showGuide = ref(true);

// 关闭指南
const closeGuide = () => {
  showGuide.value = false;
};

// 重新显示指南
const reopenGuide = () => {
  showGuide.value = true;
};

// 暴露方法和状态给父组件
defineExpose({
  showGuide,
  reopenGuide,
});

// 监听navigateToTab属性的变化
watch(
  () => props.navigateToTab,
  (newTabId) => {
    console.log("MainPanel接收到标签导航请求:", newTabId);
    if (newTabId) {
      // 设置活动标签页
      activeTab.value = newTabId;
      console.log("活动标签页已切换为:", activeTab.value);
    }
  }
);

// Tab definitions
const tabs = ref([
  {
    id: "prompt",
    name: "提示词",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>',
  },
  {
    id: "parse",
    name: "解析结果",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
  },
  {
    id: "files_preview",
    name: "文件浏览器",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>',
  },
]);

// Computed properties
const hasFiles = computed(() => fileStore.parsedFiles.length > 0);

// Methods
const handlePreviewMarkdown = (content) => {
  emit("preview-markdown", content);
};

// 复制提示词到剪贴板
const copyPrompt = () => {
  if (!promptStore.generatedPrompt) return;

  navigator.clipboard
    .writeText(promptStore.generatedPrompt)
    .then(() => {
      notificationStore.show("success", "复制成功", "提示词已复制到剪贴板");
    })
    .catch((err) => {
      notificationStore.show(
        "error",
        "复制失败",
        err.message || "请手动选择文本并复制"
      );
    });
};

// 生成提示词
const generatePrompt = () => {
  promptStore.regeneratePrompt();
  notificationStore.show(
    "success",
    "提示词已生成",
    "您可以复制提示词并发送给AI助手"
  );
};

// 解析代码
const parseCode = async () => {
  if (!fileStore.parseInput) {
    notificationStore.show("warning", "无内容可解析", "请先粘贴AI返回的代码");
    return;
  }

  // 调用正确的方法parseCode而不是parseCodeContent
  const result = await fileStore.parseCode(fileStore.parseInput);

  console.log("解析结果:", result);
  if (result && result.success) {
    notificationStore.show(
      "success",
      "代码解析成功",
      "请在文件浏览器中查看解析结果"
    );

    // 解析完成后自动跳转到文件浏览器标签
    activeTab.value = "files_preview";
  } else {
    // 处理解析失败的情况
    notificationStore.show(
      "error",
      "代码解析失败",
      result?.error || "请检查代码格式是否正确"
    );
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- 使用指南 -->
    <div
      v-if="showGuide"
      class="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <div
        class="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between"
      >
        <div class="flex items-center">
          <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-blue-500 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-800 dark:text-white">
            使用指南
          </h2>
        </div>
        <button
          @click="closeGuide"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div class="p-5">
        <ol class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <li class="flex items-start">
            <span
              class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-primary font-medium mr-3 mt-0.5"
              >1</span
            >
            <span>在左侧面板中填写项目信息并选择技术栈</span>
          </li>
          <li class="flex items-start">
            <span
              class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-primary font-medium mr-3 mt-0.5"
              >2</span
            >
            <span>点击"生成提示词"按钮，获取AI提示词</span>
          </li>
          <li class="flex items-start">
            <span
              class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-primary font-medium mr-3 mt-0.5"
              >3</span
            >
            <span>复制提示词并发送给AI助手</span>
          </li>
          <li class="flex items-start">
            <span
              class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-primary font-medium mr-3 mt-0.5"
              >4</span
            >
            <span>将AI返回的代码粘贴到"解析结果"标签页中</span>
          </li>
          <li class="flex items-start">
            <span
              class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-primary font-medium mr-3 mt-0.5"
              >5</span
            >
            <span>通过"文件结构"标签页查看并选择文件预览</span>
          </li>
        </ol>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <!-- 标签页导航 -->
      <div class="border-b border-gray-100 dark:border-gray-700">
        <div class="flex overflow-x-auto hide-scrollbar">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="flex items-center px-5 py-3.5 whitespace-nowrap border-b-2 transition-all text-sm font-medium"
            :class="[
              activeTab === tab.id
                ? 'border-primary text-primary bg-primary/5 dark:bg-primary/10'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50',
            ]"
          >
            <span v-html="tab.icon" class="mr-1.5"></span>
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="p-5">
        <!-- 提示词输出 -->
        <div v-if="activeTab === 'prompt'" class="prompt-panel">
          <div class="relative">
            <div class="absolute top-3 right-3 flex space-x-2">
              <button
                @click="copyPrompt"
                class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-1.5 rounded-md text-gray-600 dark:text-gray-300 transition-colors"
                :disabled="!promptStore.generatedPrompt"
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <button
                class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-1.5 rounded-md text-gray-600 dark:text-gray-300 transition-colors"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </button>
            </div>

            <!-- 根据是否有生成的提示词显示不同内容 -->
            <div
              v-if="!promptStore.generatedPrompt"
              class="min-h-[250px] bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg border border-gray-200 dark:border-gray-600 font-mono text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
            >
              <div
                class="animate-pulse text-center py-10 text-gray-400 dark:text-gray-500"
              >
                <p>在此输入框中生成提示词...</p>
                <p class="mt-4 text-xs">完成左侧配置并点击"生成提示词"按钮</p>
              </div>
            </div>

            <!-- 显示生成的提示词 -->
            <textarea
              v-else
              v-model="promptStore.generatedPrompt"
              class="min-h-[520px] w-full bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg border border-gray-200 dark:border-gray-600 font-mono text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none"
              readonly
            ></textarea>
          </div>

          <div class="flex justify-center mt-4">
            <button
              @click="copyPrompt"
              class="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span>复制提示词</span>
            </button>
          </div>
        </div>

        <!-- 解析结果 -->
        <div v-if="activeTab === 'parse'" class="parse-panel">
          <div class="mb-4">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >将AI助手生成的代码粘贴在此处：</label
            >
            <div class="relative">
              <textarea
                v-model="fileStore.parseInput"
                placeholder="在此处粘贴AI返回的代码..."
                rows="10"
                class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors outline-none text-gray-800 dark:text-gray-100 font-mono resize-none"
              ></textarea>
            </div>
          </div>

          <div class="flex justify-center">
            <button
              @click="parseCode"
              class="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>解析代码</span>
            </button>
          </div>
        </div>

        <!-- 合并后的文件浏览器 -->
        <div
          v-if="activeTab === 'files_preview'"
          class="grid grid-cols-12 gap-4 h-[600px]"
        >
          <!-- 左侧文件结构 -->
          <div
            class="col-span-4 border-r border-gray-200 dark:border-gray-700 pr-4 h-full overflow-y-auto"
          >
            <FilesPanel @select-file="fileStore.selectFile($event)" />
          </div>

          <!-- 右侧文件预览 -->
          <div class="col-span-8 h-full overflow-y-auto">
            <FilePreviewPanel @preview-markdown="handlePreviewMarkdown" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-panel {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 添加滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.dark .overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}
</style>
