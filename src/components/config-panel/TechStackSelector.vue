<script setup>
import { ref } from "vue";
import { useTechStackStore } from "@/stores/techStack";
import { useNotificationStore } from "@/stores/notification";
import TechStackCombinations from "./TechStackCombinations.vue";
import BestPracticesList from "./BestPracticesList.vue";
import TechCategoriesList from "./TechCategoriesList.vue";
import CustomTechInput from "./CustomTechInput.vue";

const techStackStore = useTechStackStore();
const notificationStore = useNotificationStore();

const props = defineProps({
  selectedTechs: {
    type: Array,
    required: true,
  },
  customTech: {
    type: String,
    default: "",
  },
  selectedBestPractices: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits([
  "update:selectedTechs",
  "update:customTech",
  "update:selectedBestPractices",
]);

// 处理技术栈选择
const handleTechToggled = (tech) => {
  const newSelectedTechs = [...props.selectedTechs];
  const index = newSelectedTechs.indexOf(tech);

  if (index === -1) {
    newSelectedTechs.push(tech);
  } else {
    newSelectedTechs.splice(index, 1);
  }

  emit("update:selectedTechs", newSelectedTechs);
};

// 处理技术栈组合选择
const handleCombinationSelected = (combinationName) => {
  // 使用store中的方法获取组合中的技术和最佳实践
  const result = techStackStore.selectTechCombination(combinationName);

  // 更新选中的技术栈
  emit("update:selectedTechs", [...result.techs]);

  // 更新最佳实践
  emit("update:selectedBestPractices", [...result.bestPractices]);

  // 显示通知
  notificationStore.show(
    "success",
    "技术栈组合已选择",
    `已选择 ${combinationName} 技术组合，包含 ${result.bestPractices.length} 条最佳实践`
  );
};
</script>

<template>
  <div class="space-y-5">
    <!-- 技术栈标题 -->
    <div>
      <h3
        class="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center"
      >
        <span class="text-primary mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        选择技术栈
      </h3>
    </div>

    <!-- 技术栈组合 -->
    <TechStackCombinations
      :tech-stack-combinations="techStackStore.techStackCombinations"
      @combination-selected="handleCombinationSelected"
    />

    <!-- 最佳实践列表 -->
    <BestPracticesList :best-practices="selectedBestPractices" />

    <!-- 技术分类列表 -->
    <TechCategoriesList
      :tech-categories="techStackStore.techCategories"
      :selected-techs="selectedTechs"
      :get-tech-icon-url="techStackStore.getTechIconUrl"
      @tech-toggled="handleTechToggled"
    />

    <!-- 自定义技术输入 -->
    <CustomTechInput
      :custom-tech="customTech"
      @update:custom-tech="(newValue) => emit('update:customTech', newValue)"
    />
  </div>
</template>
