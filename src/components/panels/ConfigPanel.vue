<script setup>
import { ref, computed, reactive } from "vue";
import { usePromptStore } from "@/stores/prompt";
import { useTechStackStore } from "@/stores/techStack";
import { useNotificationStore } from "@/stores/notification";
import GlassCard from "@/components/common/GlassCard.vue";

const promptStore = usePromptStore();
const techStackStore = useTechStackStore();
const notificationStore = useNotificationStore();

// 步骤控制
const currentStep = ref(1);
const totalSteps = 4;

// Local reactive state
const projectName = ref("");
const requirements = ref("");
const customTech = ref("");
const projectTheme = ref("dark");
const customThemeDescription = ref("");
const selectedTechs = ref([]);

// 预设设计提示词
const designPrompts = reactive([
  {
    name: "极简主义",
    description:
      "简约、留白、精致的设计风格，注重功能性和用户体验。使用有限的元素、简洁的排版和充足的留白空间，减少视觉噪音，突出核心内容和功能。配色方案通常采用黑白灰为主，辅以少量强调色。",
  },
  {
    name: "新拟态设计",
    description:
      "结合光影效果的柔和UI设计，创造逼真的触感体验。通过精细的阴影和高光模拟物理世界中的凸起和凹陷，使界面元素看起来像是从背景中挤压出来或嵌入其中。常用柔和的单色背景和微妙的阴影效果，创造出舒适的视觉深度。",
  },
  {
    name: "玻璃态设计",
    description:
      "透明磨砂效果，现代感强，适合展示层次感的界面。利用半透明背景和模糊效果创造出类似磨砂玻璃的视觉感受，元素之间可以相互透视，增强空间层次感。常配合细微的边框和光晕效果，提升精致感和现代感。",
  },
  {
    name: "暗黑科技风",
    description:
      "深色背景配合霓虹色调，营造高科技感的界面体验。以深黑或深蓝色为基础，搭配明亮的霓虹色（如蓝色、紫色、粉色）作为强调，常使用发光效果、网格线和科技感图形元素。界面布局通常采用模块化设计，具有未来感和科幻感。",
  },
  {
    name: "自然有机风",
    description:
      "柔和的色彩和有机形状，给人亲切自然的感觉。使用圆润的曲线、不规则形状和自然界的色彩（如绿色、棕色、蓝色等自然色调）。界面元素通常具有柔和的过渡和渐变，避免锐角和生硬的线条，营造出舒适、亲和的用户体验。",
  },
  {
    name: "复古像素风",
    description:
      "8-bit风格的像素艺术，怀旧游戏感，独特的视觉体验。采用低分辨率的像素图形和有限的色彩palette，刻意展现像素边缘，模拟早期电子游戏的视觉风格。通常搭配复古的音效和交互方式，为用户带来怀旧的游戏化体验。",
  },
  {
    name: "扁平化3D",
    description:
      "结合扁平设计和3D元素，现代感强且具有空间感。保持扁平设计的简洁性，同时通过微妙的阴影、透视和层次感引入3D效果。避免过度装饰，但利用空间关系和深度来增强用户界面的可理解性和视觉吸引力。",
  },
  {
    name: "渐变色彩风",
    description:
      "丰富的渐变色彩，活力四射，适合年轻化产品。大胆使用从一种颜色过渡到另一种颜色的渐变效果，创造出充满活力和动感的视觉体验。常用于按钮、背景和装饰元素，搭配简洁的白色空间和现代化的排版，平衡整体视觉效果。",
  },
  {
    name: "极客终端风",
    description:
      "类似命令行界面，黑底绿字，技术感极强。模拟早期计算机终端的视觉风格，通常使用等宽字体、黑色背景和亮色（绿色、白色或蓝色）文本。界面元素简洁直接，强调功能性和效率，常加入代码片段、闪烁光标和命令提示符等元素增强真实感。",
  },
  {
    name: "材料设计3.0",
    description:
      "基于Google Material Design 3.0，动态色彩系统和精致组件。采用基于物理世界启发的设计语言，包括响应式动画、自然阴影和深思熟虑的色彩系统。新版本引入了Material You个性化设计，能根据用户壁纸自动生成协调的配色方案，并提供更丰富的组件变体和交互模式。",
  },
]);
const selectedDesignPrompt = ref("");

// Initialize with some default values
selectedTechs.value = ["Vue.js", "TypeScript", "TailwindCSS", "daisyui"];

// 步骤控制方法
const nextStep = () => {
  if (currentStep.value === 1 && !projectName.value.trim()) {
    notificationStore.show("error", "请填写项目名称", "项目名称不能为空");
    return;
  }

  if (currentStep.value === 3 && !requirements.value.trim()) {
    notificationStore.show("error", "请填写项目需求", "项目需求描述不能为空");
    return;
  }

  if (currentStep.value < totalSteps) {
    currentStep.value++;
  } else {
    generatePrompt();
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

// Methods
const toggleCategory = (index) => {
  techStackStore.toggleCategory(index);
};

const toggleTech = (tech) => {
  const index = selectedTechs.value.indexOf(tech);
  if (index === -1) {
    selectedTechs.value.push(tech);
  } else {
    selectedTechs.value.splice(index, 1);
  }
};

// 新增：选择技术栈组合方法
const selectStackCombination = (combination) => {
  // 先清空已选技术栈
  selectedTechs.value = [];
  // 使用store中的方法获取组合中的技术
  const techs = techStackStore.selectTechCombination(combination);
  // 添加到已选技术栈中
  selectedTechs.value = [...techs];

  // 显示通知
  notificationStore.show(
    "success",
    "技术栈组合已选择",
    `已选择 ${combination} 技术组合`
  );
};

const selectDesignPrompt = (prompt) => {
  // 如果点击已选中的设计风格，则取消选择
  if (selectedDesignPrompt.value === prompt.name) {
    selectedDesignPrompt.value = "";
    return;
  }

  // 否则选择新的设计风格
  selectedDesignPrompt.value = prompt.name;
  if (!customThemeDescription.value) {
    customThemeDescription.value = prompt.description;
  }
};

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
  let finalThemeDescription = "";
  if (projectTheme.value === "dark") {
    finalThemeDescription = "暗色主题模式，使界面有高级感";
  } else if (projectTheme.value === "light") {
    finalThemeDescription = "亮色主题模式，使界面清爽自然";
  } else if (projectTheme.value === "both") {
    finalThemeDescription = "同时支持暗色和亮色主题模式，并提供切换功能";
  }

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
  });

  notificationStore.show(
    "success",
    "提示词已生成",
    "您可以复制提示词并发送给AI助手"
  );
};

// Computed properties
const themeDescription = computed(() => {
  if (projectTheme.value === "dark") {
    return "暗色主题模式，使界面有高级感";
  } else if (projectTheme.value === "light") {
    return "亮色主题模式，使界面清爽自然";
  } else if (projectTheme.value === "both") {
    return "同时支持暗色和亮色主题模式，并提供切换功能";
  }
  return "";
});

const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "步骤1：项目基本信息";
    case 2:
      return "步骤2：选择技术栈";
    case 3:
      return "步骤3：项目需求描述";
    case 4:
      return "步骤4：设计风格选择";
    default:
      return "项目配置";
  }
});

const icon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
</svg>`;

// 获取步骤标签
const getStepLabel = (step) => {
  switch (step) {
    case 1:
      return "基本信息";
    case 2:
      return "技术栈";
    case 3:
      return "需求描述";
    case 4:
      return "设计风格";
    default:
      return `步骤${step}`;
  }
};

// 计算属性
const isLastStep = computed(() => currentStep.value === totalSteps);
const stepProgress = computed(
  () => ((currentStep.value - 1) / (totalSteps - 1)) * 100
);
</script>

<template>
  <div class="config-panel space-y-5">
    <!-- 步骤导航卡片 -->
    <div
      class="relative overflow-hidden backdrop-blur-sm rounded-xl shadow-2xl border dark:border-gray-700/30 border-white/20 bg-white/80 dark:bg-gray-800/50"
    >
      <!-- 进度条 -->
      <div class="relative h-1.5 w-full bg-gray-200 dark:bg-gray-700/70">
        <div
          class="absolute h-full bg-gradient-to-r from-primary via-primary/90 to-secondary transition-all duration-500 ease-out"
          :style="`width: ${stepProgress}%`"
        ></div>
      </div>

      <!-- 步骤标题 -->
      <div class="p-6">
        <h2
          class="text-xl font-bold text-gray-800 dark:text-white flex items-center"
        >
          <span
            class="flex items-center justify-center w-9 h-9 mr-3 rounded-lg bg-gradient-to-br from-primary to-secondary text-white text-sm shadow-lg shadow-primary/20 dark:shadow-primary/10"
          >
            {{ currentStep }}
          </span>
          <span
            class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-primary/90 dark:to-secondary/90 font-extrabold"
          >
            <span v-if="currentStep === 1">项目基本信息</span>
            <span v-else-if="currentStep === 2">技术栈选择</span>
            <span v-else-if="currentStep === 3">需求描述</span>
            <span v-else-if="currentStep === 4">设计偏好</span>
          </span>
        </h2>
      </div>

      <!-- 步骤指示器 -->
      <div class="flex px-6 pb-5">
        <div
          v-for="step in totalSteps"
          :key="step"
          class="flex items-center"
          :class="step < totalSteps ? 'flex-1' : ''"
        >
          <button
            @click="currentStep = step"
            class="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm"
            :class="[
              step < currentStep
                ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20 dark:shadow-primary/10'
                : step === currentStep
                ? 'ring-2 ring-primary/70 ring-offset-2 dark:ring-offset-gray-800 bg-white dark:bg-gray-700 text-primary font-bold shadow-md shadow-primary/10 dark:shadow-primary/5'
                : 'bg-gray-200/70 dark:bg-gray-700/70 text-gray-500 hover:bg-gray-300/70 dark:hover:bg-gray-600/70',
            ]"
          >
            <span v-if="step < currentStep">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span v-else>{{ step }}</span>
            <span
              class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              :class="
                step === currentStep
                  ? 'text-primary'
                  : 'text-gray-500 dark:text-gray-400'
              "
            >
              {{ getStepLabel(step) }}
            </span>
          </button>
          <div
            v-if="step < totalSteps"
            class="flex-1 h-0.5 mx-2"
            :class="[
              step < currentStep
                ? 'bg-gradient-to-r from-primary to-secondary'
                : 'bg-gray-200 dark:bg-gray-700/70',
            ]"
          ></div>
        </div>
      </div>
    </div>

    <!-- 表单内容区 -->
    <div
      class="form-container bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-100/50 dark:border-gray-700/30 p-6 transition-all"
    >
      <!-- 步骤1: 项目基本信息 -->
      <div v-if="currentStep === 1" class="space-y-5">
        <div class="mb-6">
          <h3
            class="text-lg font-bold text-gray-800 dark:text-white mb-2 flex items-center"
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
                  d="M5 2a1 1 0 011 1h8a1 1 0 011 1v2H5V3a1 1 0 011-1zm10 6V5a1 1 0 00-1-1H6a1 1 0 00-1 1v3h10zm-1 1H6v7a1 1 0 001 1h6a1 1 0 001-1v-7z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            项目名称
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
            为您的项目起一个简洁明了的名称
          </p>
          <input
            v-model="projectName"
            type="text"
            placeholder="输入项目名称"
            class="w-full px-4 py-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/80 border border-gray-200/80 dark:border-gray-600/50 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 outline-none text-gray-800 dark:text-gray-100 shadow-sm"
          />
        </div>
      </div>

      <!-- 步骤2: 技术栈选择 -->
      <div v-if="currentStep === 2" class="space-y-5">
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

        <!-- 技术栈组合部分 -->
        <div
          class="p-4 rounded-lg border border-primary/20 bg-primary/5 dark:bg-primary/10 mb-6"
        >
          <h4
            class="text-sm font-semibold text-gray-800 dark:text-white mb-2 flex items-center"
          >
            <span class="text-primary mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                />
              </svg>
            </span>
            技术栈组合一键选择
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
            选择预设技术组合可以快速配置常用技术栈
          </p>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
          >
            <button
              v-for="combo in techStackStore.techStackCombinations"
              :key="combo.name"
              @click="selectStackCombination(combo.name)"
              class="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all flex flex-col items-center text-center group"
            >
              <div class="w-8 h-8 mb-1 flex items-center justify-center">
                <img
                  :src="`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${combo.icon}`"
                  :alt="combo.name"
                  class="w-6 h-6 group-hover:scale-110 transition-transform"
                  onerror="this.style.display='none'"
                />
              </div>
              <span
                class="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary"
                >{{ combo.name }}</span
              >
              <span
                class="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1"
                >{{ combo.description }}</span
              >
            </button>
          </div>
        </div>

        <!-- 所有技术栈选项 -->
        <div class="space-y-3 mb-4">
          <div
            v-for="(category, categoryIndex) in techStackStore.techCategories"
            :key="categoryIndex"
            class="p-3 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-100/50 dark:border-gray-700/30"
          >
            <h4
              class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between items-center"
            >
              <span>{{ category.name }}</span>
              <span
                class="text-primary/70 text-[10px]"
                v-if="
                  category.techs.some((tech) => selectedTechs.includes(tech))
                "
              >
                已选:
                {{
                  category.techs.filter((tech) => selectedTechs.includes(tech))
                    .length
                }}
              </span>
            </h4>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="tech in category.techs"
                :key="tech"
                @click="toggleTech(tech)"
                class="px-1.5 py-0.5 rounded-md text-xs transition-all flex items-center"
                :class="[
                  selectedTechs.includes(tech)
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm shadow-primary/20'
                    : 'bg-gray-100/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600',
                ]"
              >
                <img
                  :src="techStackStore.getTechIconUrl(tech)"
                  class="w-3 h-3 mr-1"
                  :alt="tech"
                  onerror="this.style.display='none'"
                />
                {{ tech }}
              </button>
            </div>
          </div>
        </div>

        <!-- 自定义技术栈 -->
        <div
          class="p-3 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-100/50 dark:border-gray-700/30"
        >
          <h4 class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            自定义技术 (用逗号分隔)
          </h4>
          <div class="relative">
            <input
              v-model="customTech"
              type="text"
              placeholder="例如: React Native, Flutter, Unity..."
              class="w-full px-3 py-2 rounded-md bg-gray-50/80 dark:bg-gray-700/80 border border-gray-200/80 dark:border-gray-600/50 focus:ring-1 focus:ring-primary/50 focus:border-primary text-xs text-gray-800 dark:text-gray-100 shadow-sm"
            />
          </div>
        </div>
      </div>

      <!-- 步骤3: 需求描述 -->
      <div v-if="currentStep === 3" class="space-y-5">
        <div>
          <h3
            class="text-lg font-bold text-gray-800 dark:text-white mb-2 flex items-center"
          >
            <span class="text-primary mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                />
                <path
                  fill-rule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            项目需求
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
            请详细描述您的项目功能需求
          </p>
          <textarea
            v-model="requirements"
            placeholder="例如：我需要一个具有用户登录、任务管理和数据分析功能的网站..."
            rows="20"
            class="w-full px-4 py-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/80 border border-gray-200/80 dark:border-gray-600/50 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 outline-none text-gray-800 dark:text-gray-100 resize-none shadow-sm"
          ></textarea>
        </div>
      </div>

      <!-- 步骤4: 设计偏好 -->
      <div v-if="currentStep === 4" class="space-y-5">
        <div>
          <h3
            class="text-lg font-bold text-gray-800 dark:text-white mb-2 flex items-center"
          >
            <span class="text-primary mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            设计风格
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            选择一种您喜欢的设计风格
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="prompt in designPrompts"
              :key="prompt.name"
              @click="selectDesignPrompt(prompt)"
              class="cursor-pointer rounded-lg border p-4 transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
              :class="[
                selectedDesignPrompt === prompt.name
                  ? 'border-primary/30 bg-primary/5 dark:bg-primary/10 shadow-md shadow-primary/10'
                  : 'border-gray-200/80 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/80 hover:border-gray-300/80 dark:hover:border-gray-600/80',
              ]"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              ></div>
              <div class="relative">
                <h4
                  class="font-medium text-gray-800 dark:text-white mb-1 group-hover:text-primary transition-colors duration-300"
                >
                  {{ prompt.name }}
                </h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ prompt.description }}
                </p>
                <div
                  v-if="selectedDesignPrompt === prompt.name"
                  class="absolute top-0 right-0 text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮区 -->
    <div class="sticky-buttons flex justify-between pt-3">
      <button
        v-if="currentStep > 1"
        @click="prevStep"
        class="btn px-6 py-2.5 bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-700/70 dark:hover:bg-gray-600/70 text-gray-800 dark:text-white rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-sm hover:shadow"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>上一步</span>
      </button>
      <button v-else class="invisible btn px-6 py-2.5"></button>

      <button
        @click="nextStep"
        class="btn px-6 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <span>{{ isLastStep ? "生成提示词" : "下一步" }}</span>
        <svg
          v-if="!isLastStep"
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
            d="M9 5l7 7-7 7"
          />
        </svg>
        <svg
          v-else
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.config-panel {
  animation: fadeIn 0.5s ease-out;
  position: relative;
  min-height: 90vh; /* 确保内容区至少占据视口高度的90% */
}

/* 粘性底部按钮区样式 */
.sticky-buttons {
  position: sticky;
  bottom: 3vh; /* 距离底部至少10%的视口高度 */
  padding-bottom: 1rem;

  z-index: 10;
}

.dark .sticky-buttons {
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

/* 为按钮添加微妙的悬浮动画 */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: translateY(-1px);
}

/* 添加阴影效果提升层次感 */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* 添加卡片边框发光效果 */
.form-container:hover {
  box-shadow: 0 0 15px rgba(79, 70, 229, 0.1);
  border-color: rgba(79, 70, 229, 0.3);
}
</style>
