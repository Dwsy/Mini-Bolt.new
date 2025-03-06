<script setup>
import { ref } from "vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import ConfigPanel from "@/components/panels/ConfigPanel.vue";
import MainPanel from "@/components/panels/MainPanel.vue";

// Modals
import TemplateManagerModal from "@/components/modals/TemplateManagerModal.vue";
import HistoryModal from "@/components/modals/HistoryModal.vue";
import ParseHistoryModal from "@/components/modals/ParseHistoryModal.vue";
import MarkdownPreviewModal from "@/components/modals/MarkdownPreviewModal.vue";

// Modal visibility states
const showTemplateManager = ref(false);
const showHistoryModal = ref(false);
const showParseHistoryModal = ref(false);
const showMarkdownPreview = ref(false);

// 创建一个ref来存储要切换到的标签页
const activeTabToNavigate = ref(null);

// 引用mainPanel组件
const mainPanelRef = ref(null);

// Methods to toggle modal visibility
const toggleTemplateManager = () => {
  showTemplateManager.value = !showTemplateManager.value;
};

const toggleHistoryModal = () => {
  showHistoryModal.value = !showHistoryModal.value;
};

const toggleParseHistoryModal = () => {
  showParseHistoryModal.value = !showParseHistoryModal.value;
};

const toggleMarkdownPreview = (content = "") => {
  showMarkdownPreview.value = !showMarkdownPreview.value;
  return content; // Used by MarkdownPreviewModal to get content
};

// 处理标签页导航事件
const handleNavigateToTab = (tabId) => {
  // 先设置为null然后设置为目标值，强制触发watch
  activeTabToNavigate.value = null;
  // 使用setTimeout确保在下一个tick中设置，这样watch能够检测到变化
  setTimeout(() => {
    activeTabToNavigate.value = tabId;
    console.log("设置导航标签页为:", tabId);
  }, 0);
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <!-- 顶部渐变背景装饰 -->
    <div
      class="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 -z-10"
    ></div>

    <!-- 背景装饰图形 -->
    <div class="absolute top-0 left-0 right-0 h-screen overflow-hidden -z-10">
      <!-- 圆形装饰 -->
      <div
        class="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-secondary/5 blur-3xl dark:from-primary/5 dark:to-secondary/5 animate-pulse-slow"
      ></div>
      <div
        class="absolute top-96 left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-secondary/5 to-primary/10 blur-3xl dark:from-secondary/5 dark:to-primary/5 animate-pulse-slow animation-delay-2000"
      ></div>
    </div>

    <!-- 页面内容 -->
    <AppHeader
      @show-template-manager="toggleTemplateManager"
      @show-history-modal="toggleHistoryModal"
      @show-parse-history-modal="toggleParseHistoryModal"
    />

    <div class="container mx-auto px-4 pb-10">
      <!-- 主内容区域 -->
      <div class="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <!-- 左侧面板 - 项目配置 -->
        <div class="xl:col-span-2">
          <ConfigPanel @navigate-to-tab="handleNavigateToTab" />
        </div>

        <!-- 右侧面板 - 主要内容 -->
        <div class="xl:col-span-3">
          <MainPanel
            ref="mainPanelRef"
            @preview-markdown="toggleMarkdownPreview"
            :navigate-to-tab="activeTabToNavigate"
          />
        </div>
      </div>

      <!-- 页脚 -->
      <div class="text-center text-gray-500 dark:text-gray-400 text-xs">
        <p class="">
          © {{ new Date().getFullYear() }} Mini-Bolt.new · 使用 Claude AI 构建
        </p>
        <button
          v-if="mainPanelRef && !mainPanelRef.showGuide"
          @click="mainPanelRef.reopenGuide()"
          class="text-primary hover:text-primary-focus underline text-xs transition-colors duration-200 cursor-pointer mx-auto mt-1"
        >
          显示使用指南
        </button>
      </div>
    </div>

    <!-- 模态框 -->
    <TemplateManagerModal
      v-if="showTemplateManager"
      @close="toggleTemplateManager"
    />

    <HistoryModal
      v-if="showHistoryModal"
      @close="toggleHistoryModal"
      @navigate-to-tab="handleNavigateToTab"
    />

    <ParseHistoryModal
      v-if="showParseHistoryModal"
      @close="toggleParseHistoryModal"
      @navigate-to-tab="handleNavigateToTab"
    />

    <MarkdownPreviewModal
      v-if="showMarkdownPreview"
      @close="toggleMarkdownPreview"
    />
  </div>
</template>

<style>
.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}
</style>
