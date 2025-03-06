<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useNotificationStore } from "@/stores/notification";
import { getRandomProjectNames } from "@/config/projectConfig";

const notificationStore = useNotificationStore();

const props = defineProps({
  projectNamesList: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["name-selected"]);

// 弹幕显示的项目数量
const NUM_DISPLAYED_NAMES = 10;
// 存储项目名称数据
const projectItems = ref([]);
// 跟踪弹幕完成状态
const completedItems = ref(new Set());
// 是否正在刷新
const isRefreshing = ref(false);

// 检测用户语言环境
const getUserLanguage = () => {
  const userLang = navigator.language || navigator.userLanguage;
  return userLang.toLowerCase().startsWith("zh") ? "zh" : "en";
};

// 计算所有弹幕是否已完成
const allItemsCompleted = computed(() => {
  return (
    completedItems.value.size >= projectItems.value.length &&
    projectItems.value.length > 0
  );
});

// 监听弹幕完成事件
const handleAnimationEnd = (index) => {
  completedItems.value.add(index);

  // 当所有弹幕都完成动画且不在刷新状态时，自动刷新
  if (allItemsCompleted.value && !isRefreshing.value) {
    autoRefreshProjectNames();
  }
};

// 自动刷新项目名称列表（无通知）
const autoRefreshProjectNames = () => {
  isRefreshing.value = true;

  // 清空完成状态
  completedItems.value.clear();

  // 生成新的项目名称
  generateProjectItems();

  // 重置刷新状态
  setTimeout(() => {
    isRefreshing.value = false;
  }, 500);
};

// 选择项目名称的方法
const selectProjectName = (item) => {
  const userLang = getUserLanguage();
  const nameToUse = userLang === "zh" ? item.zhName : item.name;
  emit("name-selected", nameToUse);

  if (userLang === "zh") {
    notificationStore.show(
      "success",
      "已选择项目名称",
      `已选择 ${item.zhName} (${item.name}) 作为您的项目名称`
    );
  } else {
    notificationStore.show(
      "success",
      "Project Name Selected",
      `Selected ${item.name} (${item.zhName}) as your project name`
    );
  }
};

// 生成项目名称数据
const generateProjectItems = () => {
  // 获取随机项目名称
  const selectedItems = getRandomProjectNames(NUM_DISPLAYED_NAMES);
  // 可用的垂直位置列表，避免重叠
  const availablePositions = Array.from({ length: 10 }, (_, i) => 10 + i * 8);

  projectItems.value = selectedItems.map((item, index) => {
    // 随机选择一个可用的垂直位置
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const topPosition = availablePositions.splice(randomIndex, 1)[0];

    // 随机动画持续时间 (8-15秒)
    const duration = 8 + Math.floor(Math.random() * 7);

    // 随机延迟 (0-5秒)
    const delay = Math.floor(Math.random() * 5);

    // 随机类型 (primary, secondary, default)
    const types = ["primary", "secondary", "default"];
    const type = types[Math.floor(Math.random() * types.length)];

    // 准备显示文本
    const userLang = getUserLanguage();
    const mainText = userLang === "zh" ? item.zhName : item.name;
    const altText = userLang === "zh" ? item.name : item.zhName;
    const displayText = `${mainText} (${altText})`;

    return {
      ...item,
      type,
      displayText,
      topPosition,
      duration,
      delay,
      // 随机透明度 (0.8-1.0)
      opacity: 0.8 + Math.random() * 0.2,
      // 随机起始位置 (确保不会同时出现)
      startPosition: index * 10,
    };
  });
};

// 手动刷新项目名称列表（带通知）
const refreshProjectNames = () => {
  // 清空完成状态
  completedItems.value.clear();

  generateProjectItems();

  const userLang = getUserLanguage();
  if (userLang === "zh") {
    notificationStore.show("info", "刷新成功", "已刷新推荐项目名称列表");
  } else {
    notificationStore.show(
      "info",
      "Refreshed",
      "Project name suggestions refreshed"
    );
  }
};

// 组件挂载时初始化
onMounted(() => {
  generateProjectItems();
});
</script>

<template>
  <div class="mt-5 relative">
    <h4 class="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center">
      <span class="text-primary mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
          />
        </svg>
      </span>
      {{
        getUserLanguage() === "zh" ? "推荐项目名称" : "Suggested Project Names"
      }}
    </h4>

    <!-- 弹幕容器 -->
    <div class="barrage-container">
      <!-- 使用v-for渲染每个弹幕项 -->
      <div
        v-for="(item, index) in projectItems"
        :key="index"
        :class="['barrage-item', `barrage-type-${item.type}`]"
        :style="{
          top: `${item.topPosition}%`,
          opacity: item.opacity,
          animationDuration: `${item.duration}s`,
          animationDelay: `${item.delay}s`,
          animationPlayState: 'running',
        }"
        @click="selectProjectName(item)"
        @mouseenter="$event.target.style.animationPlayState = 'paused'"
        @mouseleave="$event.target.style.animationPlayState = 'running'"
        @animationend="handleAnimationEnd(index)"
      >
        {{ item.displayText }}
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        @click="refreshProjectNames"
        class="text-xs py-2 px-4 rounded-full bg-gradient-to-r to-purple-200 text-blue-700 hover:from-blue-200 hover:to-purple-300 transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:scale-105 backdrop-filter backdrop-blur-sm border border-blue-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-2 animate-spin-slow text-blue-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="font-medium">{{
          getUserLanguage() === "zh" ? "刷新推荐" : "Refresh"
        }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.barrage-container {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(156, 163, 175, 0.5);
  border-radius: 1rem;
  background: linear-gradient(
    to right,
    rgba(59, 130, 246, 0.1),
    rgba(147, 51, 234, 0.1)
  );
  height: 320px;
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.barrage-container:hover {
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
  border-color: rgba(147, 51, 234, 0.3);
}

.barrage-item {
  position: absolute;
  white-space: nowrap;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  animation: moveLeftToRight linear infinite;
  right: -300px;
  transform: translateZ(0);
  will-change: transform;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.3s ease, opacity 0.3s ease;
  letter-spacing: 0.02em;
  font-weight: 500;
}

.barrage-item:hover {
  transform: scale(1.15) translateZ(0);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
  opacity: 1;
  filter: brightness(1.05);
}

/* 不同类型的弹幕样式 */
.barrage-type-primary {
  background: linear-gradient(to right, #3b82f6, #9333ea);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.barrage-type-secondary {
  background: white;
  color: #3b82f6;
  border: 1px solid #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.barrage-type-default {
  background: rgba(229, 231, 235, 0.9);
  color: #374151;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* 弹幕动画 */
@keyframes moveLeftToRight {
  0% {
    right: -300px;
    transform: translateY(0) translateZ(0);
  }
  50% {
    transform: translateY(-5px) translateZ(0);
  }
  100% {
    right: calc(100% + 300px);
    transform: translateY(0) translateZ(0);
  }
}

/* 暗黑模式适配 */
@media (prefers-color-scheme: dark) {
  .barrage-container {
    background: linear-gradient(
      to right,
      rgba(59, 130, 246, 0.15),
      rgba(147, 51, 234, 0.15)
    );
    border-color: rgba(156, 163, 175, 0.3);
  }

  .barrage-type-primary {
    background: linear-gradient(to right, #4f46e5, #9333ea);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
  }

  .barrage-type-secondary {
    background: rgba(30, 41, 59, 0.8);
    color: #93c5fd;
    border: 1px solid #93c5fd;
    box-shadow: 0 4px 12px rgba(147, 197, 253, 0.2);
  }

  .barrage-type-default {
    background: rgba(51, 65, 85, 0.8);
    color: #e2e8f0;
    box-shadow: 0 4px 12px rgba(226, 232, 240, 0.1);
  }
}
</style>
