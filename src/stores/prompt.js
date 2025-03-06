import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useTemplateStore } from "./templates";

export const usePromptStore = defineStore("prompt", () => {
  // State
  const projectInfo = ref({
    projectName: "",
    selectedTechs: [],
    projectTheme: "dark",
    requirements: "",
  });

  const generatedPrompt = ref("");
  const promptHistory = ref([]);

  // 预设设计提示词
  const designPrompts = ref([
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

  // Load history from localStorage
  try {
    const savedHistory = localStorage.getItem("mini-bolt-history");
    if (savedHistory) {
      promptHistory.value = JSON.parse(savedHistory);
    }
  } catch (error) {
    console.error("Failed to load prompt history:", error);
  }

  // 步骤控制状态和方法
  const stepControl = reactive({
    currentStep: 1,
    totalSteps: 4,
    stepProgress: computed(
      () => ((stepControl.currentStep - 1) / (stepControl.totalSteps - 1)) * 100
    ),
    isLastStep: computed(
      () => stepControl.currentStep === stepControl.totalSteps
    ),

    // 步骤控制方法
    nextStep(validation) {
      // 如果提供了验证函数，则先验证
      if (validation && !validation()) {
        return false;
      }

      if (stepControl.currentStep < stepControl.totalSteps) {
        stepControl.currentStep++;
        return true;
      }
      return false;
    },

    prevStep() {
      if (stepControl.currentStep > 1) {
        stepControl.currentStep--;
        return true;
      }
      return false;
    },

    goToStep(step) {
      if (step >= 1 && step <= stepControl.totalSteps) {
        stepControl.currentStep = step;
        return true;
      }
      return false;
    },

    // 获取步骤标签
    getStepLabel(step) {
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
    },

    // 获取步骤标题
    getStepTitle() {
      switch (stepControl.currentStep) {
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
    },
  });

  // Actions
  function generatePrompt(info) {
    // Store project info for potential reuse
    projectInfo.value = { ...info };

    // Extract technologies
    const allTechs = info.selectedTechs || [];

    // 确定是否有特定框架
    const hasNextJs = allTechs.includes("Next.js");
    const hasVue = allTechs.includes("Vue.js") || allTechs.includes("Nuxt.js");
    const hasReact = allTechs.includes("React") || hasNextJs;
    const hasTailwind =
      allTechs.includes("Tailwind") || allTechs.includes("TailwindCSS");

    // 生成技术栈描述
    const techStackStr = allTechs.join(", ");

    // 基本开发规范
    const basicRules = [
      "为了减少代码量可以抽取公共组件,函数",
      "使用.env配置环境变量",
      "编写详细的readme文档",
      "在package.json中固定npm包的版本号(使用精确版本如^18.2.0而非~18.2.0或*),确保项目稳定性和一致性",
      "添加合适的.gitignore文件",
      "配置ESLint和Prettier保证代码质量",
    ];

    // 根据技术栈添加特定规则
    if (hasNextJs) {
      basicRules.push(
        "使用Next.js 14+,利用App Router和React Server Components,正确处理'use client'指令"
      );
    }

    if (hasReact) {
      basicRules.push(
        "使用React 18.2+,采用函数组件和新的Hooks(如useId,useDeferredValue),遵循React最佳实践"
      );
    }

    if (hasVue) {
      basicRules.push(
        "使用Vue 3.4+和Composition API,利用<script setup>语法糖和响应式API"
      );
    }

    if (hasTailwind) {
      basicRules.push("使用TailwindCSS最新版本,合理使用工具类和主题配置");
    }

    // 格式化规则
    const formattedRules = basicRules
      .map((rule, index) => `${index + 1}. ${rule}`)
      .join("\n");

    // 准备变量对象
    const variables = {
      projectName: info.projectName,
      techStackStr: techStackStr,
      requirements: info.requirements || "",
      themeDescription: info.themeDescription || "",
      rule: formattedRules,
      hasNextJs: hasNextJs,
      designStyle: info.designStyle || "",
      designDescription: info.themeDescription || "",
    };

    // 从templates store获取当前模板并填充变量
    const templateStore = useTemplateStore();
    const currentTemplate = templateStore.getCurrentTemplate;

    // 使用模板替换变量
    const finalPrompt = templateStore.replaceTemplateVariables(
      currentTemplate,
      variables
    );

    generatedPrompt.value = finalPrompt;

    // Update projectInfo
    projectInfo.value = {
      projectName: info.projectName,
      selectedTechs: allTechs,
      requirements: info.requirements,
      themeDescription: info.themeDescription,
      bestPractices: info.bestPractices || [],
      rule: formattedRules,
      isMvpMode: info.isMvpMode || false,
    };

    // Add to history
    addToHistory(info.projectName, generatedPrompt.value);

    return generatedPrompt.value;
  }

  function regeneratePrompt() {
    return generatePrompt(projectInfo.value);
  }

  function addToHistory(projectName, prompt) {
    promptHistory.value.unshift({
      projectName,
      prompt,
      timestamp: Date.now(),
      projectInfo: { ...projectInfo.value },
    });

    // Limit history size to 50 items
    if (promptHistory.value.length > 50) {
      promptHistory.value = promptHistory.value.slice(0, 50);
    }

    // Save to localStorage
    try {
      localStorage.setItem(
        "mini-bolt-history",
        JSON.stringify(promptHistory.value)
      );
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  }

  function clearHistory() {
    promptHistory.value = [];
    localStorage.removeItem("mini-bolt-history");
  }

  function removeHistoryItem(index) {
    promptHistory.value.splice(index, 1);
    localStorage.setItem(
      "mini-bolt-history",
      JSON.stringify(promptHistory.value)
    );
  }

  function useHistoryPrompt(index) {
    // 更新提示词
    generatedPrompt.value = promptHistory.value[index].prompt;

    // 如果历史记录中包含项目信息，也要更新它
    if (promptHistory.value[index].projectInfo) {
      projectInfo.value = { ...promptHistory.value[index].projectInfo };
    }

    // 触发文件解析（如果有文件解析结果的话）
    if (promptHistory.value[index].parseResult) {
      // 如果我们需要通知其他store，可以在这里添加代码
      // 例如: fileStore.setFiles(promptHistory.value[index].parseResult)
    }
  }

  // 获取设计提示词列表
  function getDesignPrompts() {
    return designPrompts.value;
  }

  // 根据名称获取设计提示词
  function getDesignPromptByName(name) {
    return designPrompts.value.find((prompt) => prompt.name === name);
  }

  // 获取主题描述
  function getThemeDescription(theme) {
    if (theme === "dark") {
      return "暗色主题模式，使界面有高级感";
    } else if (theme === "light") {
      return "亮色主题模式，使界面清爽自然";
    } else if (theme === "both") {
      return "同时支持暗色和亮色主题模式，并提供切换功能";
    }
    return "";
  }

  return {
    projectInfo,
    generatedPrompt,
    promptHistory,
    generatePrompt,
    regeneratePrompt,
    addToHistory,
    clearHistory,
    removeHistoryItem,
    useHistoryPrompt,
    designPrompts,
    getDesignPrompts,
    getDesignPromptByName,
    getThemeDescription,
    stepControl,
  };
});
