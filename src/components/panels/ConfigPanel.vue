<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { usePromptStore } from "@/stores/prompt";
import { useTechStackStore } from "@/stores/techStack";
import { useNotificationStore } from "@/stores/notification";
import GlassCard from "@/components/common/GlassCard.vue";
import ConfettiEffect from "@/components/common/ConfettiEffect.vue";

// 导入拆分后的子组件
import StepProgressBar from "../config-panel/StepProgressBar.vue";
import ProjectBasicInfo from "../config-panel/ProjectBasicInfo.vue";
import TechStackSelector from "../config-panel/TechStackSelector.vue";
import RequirementsInput from "../config-panel/RequirementsInput.vue";
import DesignStyleSelector from "../config-panel/DesignStyleSelector.vue";
import StepNavigationButtons from "../config-panel/StepNavigationButtons.vue";

const promptStore = usePromptStore();
const techStackStore = useTechStackStore();
const notificationStore = useNotificationStore();

// 从promptStore中获取步骤控制
const stepControl = promptStore.stepControl;

// 状态管理
const projectName = ref("");
const requirements = ref("");
const customTech = ref("");
const projectTheme = ref("dark");
const customThemeDescription = ref("");
const selectedTechs = ref([]);
const selectedBestPractices = ref([]); // 存储选中技术栈的最佳实践
const isMvpMode = ref(false); // 是否只生成MVP版本

// 从promptStore获取设计提示词
const designPrompts = computed(() => promptStore.getDesignPrompts());
const selectedDesignPrompt = ref("");

// 控制撒花特效的显示
const showConfetti = ref(false);

// 定义emit，添加navigate-to-tab事件
const emit = defineEmits(["navigate-to-tab"]);

// 处理步骤导航点击
const handleStepClick = (step) => {
  stepControl.goToStep(step);
};

// 步骤控制方法，使用store中的方法，但添加验证逻辑
const nextStep = () => {
  // 验证函数
  const validateCurrentStep = () => {
    if (stepControl.currentStep === 1 && !projectName.value.trim()) {
      notificationStore.show("error", "请填写项目名称", "项目名称不能为空");
      return false;
    }

    if (stepControl.currentStep === 3 && !requirements.value.trim()) {
      notificationStore.show("error", "请填写项目需求", "项目需求描述不能为空");
      return false;
    }

    return true;
  };

  // 如果是最后一步，则生成提示词
  if (stepControl.isLastStep) {
    generatePrompt();
    return;
  }

  // 否则进入下一步
  stepControl.nextStep(validateCurrentStep);
};

const prevStep = () => {
  stepControl.prevStep();
};

// 生成提示词函数
const generatePrompt = () => {
  // Get all selected technologies
  const allTechs = [...selectedTechs.value];
  if (customTech.value.trim()) {
    const customTechs = customTech.value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    allTechs.push(...customTechs);
  }

  // 准备主题描述
  let finalThemeDescription = promptStore.getThemeDescription(
    projectTheme.value
  );

  // 如果有自定义主题描述，添加上去
  if (customThemeDescription.value.trim()) {
    finalThemeDescription += "。" + customThemeDescription.value;
  }

  // 如果选择了设计提示词，也添加上去
  if (selectedDesignPrompt.value) {
    finalThemeDescription += "。设计风格：" + selectedDesignPrompt.value;
  }

  // Generate the prompt
  promptStore.generatePrompt({
    projectName: projectName.value,
    selectedTechs: allTechs,
    projectTheme: projectTheme.value,
    requirements: requirements.value,
    themeDescription: finalThemeDescription,
    bestPractices: selectedBestPractices.value, // 添加最佳实践到提示词生成参数中
    isMvpMode: isMvpMode.value, // 添加MVP模式设置
  });

  // 显示通知
  notificationStore.show(
    "success",
    "提示词已生成",
    "您可以复制提示词并发送给AI助手"
  );

  // 触发撒花特效
  showConfetti.value = true;

  // 通知父组件跳转到提示词标签页
  setTimeout(() => {
    emit("navigate-to-tab", "prompt");
  }, 300); // 短暂延迟，让撒花特效先开始显示
};

// Computed properties
const themeDescription = computed(() => {
  return promptStore.getThemeDescription(projectTheme.value);
});
</script>

<template>
  <div class="config-panel space-y-5">
    <!-- 步骤导航组件 -->
    <StepProgressBar :stepControl="stepControl" @step-click="handleStepClick" />

    <!-- 表单内容区 -->
    <div
      class="form-container bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-100/50 dark:border-gray-700/30 p-6 transition-all"
    >
      <!-- 步骤1: 项目基本信息 -->
      <ProjectBasicInfo
        v-if="stepControl.currentStep === 1"
        v-model:projectName="projectName"
      />

      <!-- 步骤2: 技术栈选择 -->
      <TechStackSelector
        v-if="stepControl.currentStep === 2"
        v-model:selectedTechs="selectedTechs"
        v-model:customTech="customTech"
        v-model:selectedBestPractices="selectedBestPractices"
      />

      <!-- 步骤3: 需求描述 -->
      <RequirementsInput
        v-if="stepControl.currentStep === 3"
        v-model:requirements="requirements"
        v-model:isMvpMode="isMvpMode"
      />

      <!-- 步骤4: 设计风格选择 -->
      <DesignStyleSelector
        v-if="stepControl.currentStep === 4"
        :designPrompts="designPrompts"
        v-model:selectedDesignPrompt="selectedDesignPrompt"
        v-model:customThemeDescription="customThemeDescription"
      />
    </div>

    <!-- 底部导航按钮组件 -->
    <StepNavigationButtons
      :stepControl="stepControl"
      @prev-step="prevStep"
      @next-step="nextStep"
    />
  </div>

  <!-- 添加撒花特效组件 -->
  <ConfettiEffect
    :active="showConfetti"
    :duration="6000"
    :particleCount="50"
    @complete="showConfetti = false"
  />
</template>

<style scoped>
.config-panel {
  animation: fadeIn 0.5s ease-out;
  position: relative;
  min-height: 90vh; /* 确保内容区至少占据视口高度的90% */
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

/* 增加毛玻璃效果 */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* 添加卡片边框发光效果 */
.form-container:hover {
  box-shadow: 0 0 15px rgba(79, 70, 229, 0.1);
  border-color: rgba(79, 70, 229, 0.3);
}
</style>
