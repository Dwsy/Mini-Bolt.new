import { defineStore } from "pinia";
import { ref, computed } from "vue";
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

  // Load history from localStorage
  try {
    const savedHistory = localStorage.getItem("mini-bolt-history");
    if (savedHistory) {
      promptHistory.value = JSON.parse(savedHistory);
    }
  } catch (error) {
    console.error("Failed to load prompt history:", error);
  }

  // Actions
  function generatePrompt(info) {
    const templateStore = useTemplateStore();

    // Store project info
    projectInfo.value = { ...info };

    // Get all technologies
    const allTechs = [...info.selectedTechs];

    // Check if Next.js is included
    const hasNextJs = allTechs.includes("Next.js");

    // Generate tech stack string
    const techStackStr = allTechs.join("+");

    // Get theme description
    let themeDescription = "";
    if (info.projectTheme === "dark") {
      themeDescription = "暗色主题模式，使界面有高级感";
    } else if (info.projectTheme === "light") {
      themeDescription = "亮色主题模式，使界面清爽自然";
    } else if (info.projectTheme === "both") {
      themeDescription = "同时支持暗色和亮色主题模式，并提供切换功能";
    }
    // Generate rule section based on tech stack
    const rules = {
      // 基础规则
      base: {
        code: "为了减少代码量可以抽取公共组件,函数",
        env: "使用.env配置环境变量",
        docs: "编写详细的readme文档",
        version:
          "在package.json中固定npm包的版本号(使用精确版本如^18.2.0而非~18.2.0或*),确保项目稳定性和一致性",
        git: "添加合适的.gitignore文件",
        lint: "配置ESLint和Prettier保证代码质量",
      },

      // 前端框架相关
      frontend: {
        nextjs:
          "使用Next.js 14版本,利用App Router和React Server Components,正确处理'use client'指令",
        react:
          "使用React 18.2+,采用函数组件和新的Hooks(如useId,useDeferredValue),遵循React最佳实践",
        vue: "使用Vue 3.3+和Composition API,利用<script setup>语法糖和响应式API",
        angular: "使用Angular 17+,利用新的控制流语法和信号(Signals)API",
        svelte: "使用Svelte 4+或SvelteKit 2+,利用其响应式特性减少模板代码",
        config:
          "前端代码需要返回正确的配置文件如next.config.js,tailwind.config.js,postcss.config.js,tsconfig.json,package.json等，还需要处理路径引用",
      },

      // 数据相关
      data: {
        mock: "使用MSW 2.0+进行API模拟",
        real: "不要mock直接使用前端调用后端",
        prisma: "使用Prisma 5.0+,确保模型定义准确并提供seed脚本",
        sqlite: "使用SQLite 3.40+,注意其特性限制如不支持枚举类型",
        mongodb: "使用MongoDB 6.0+和MongoDB Node.js Driver 5.0+或Mongoose 8.0+",
        postgresql: "使用PostgreSQL 16+和pg 8.11+,利用JSON和数组等高级特性",
        supabase: "使用Supabase JS v2 SDK,正确配置RLS权限和实时订阅",
        firebase: "使用Firebase v10 SDK模块化导入,遵循安全规则",
      },

      // UI相关
      ui: {
        tailwindCDN:
          "如果使用Tailwind使用CDN方式而不是安装库的方式,所以不需要在postcss.config.js中配置tailwindcss",
        daisyui: "使用daisyUI 4.0+,合理使用组件和主题系统",
        shadcn: "使用最新的shadcn/ui组件,按需导入并自定义主题",
        mui: "使用Material UI 5.14+,利用新的Joy UI和系统组件",
        antd: "使用Ant Design 5.10+,利用其主题定制和国际化功能",
        chakra: "使用Chakra UI 2.8+,利用其主题系统和响应式API",
      },

      // 状态管理
      state: {
        redux: "使用Redux Toolkit 2.0+,利用createSlice和RTK Query简化状态管理",
        zustand: "使用Zustand 4.4+,合理设计store结构和中间件",
        mobx: "使用MobX 6.10+,正确使用makeObservable和响应式原则",
        xstate: "使用XState 5.0+,利用状态图和actor模型",
        recoil: "使用Recoil 0.7+,设计原子化状态和选择器",
        pinia: "使用Pinia 2.1+,遵循模块化状态管理和组合式API",
      },

      // 数据请求
      request: {
        axios: "使用Axios 1.6+,配置拦截器和错误处理",
        swr: "使用SWR 2.2+,利用其缓存机制和乐观UI更新",
        reactQuery: "使用TanStack Query v5,合理设置缓存策略和失效机制",
        apollo: "使用Apollo Client 3.8+,优化查询性能和缓存策略",
        rtkQuery: "使用RTK Query(Redux Toolkit 2.0+的一部分),集成到Redux应用",
      },

      // 后端技术
      backend: {
        nodejs: "使用Node.js 20 LTS,利用ES模块和新的API",
        express: "使用Express 4.18+,设计RESTful API和中间件",
        fastapi: "使用FastAPI 0.104+,利用类型提示和异步特性",
        django: "使用Django 5.0+,遵循MTV架构模式",
        spring: "使用Spring Boot 3.2+,利用Java 21特性",
        laravel: "使用Laravel 10+,利用其优雅特性和数据库迁移",
      },
    };

    let rule = [
      rules.base.code,
      rules.base.env,
      rules.base.docs,
      rules.base.version,
      rules.base.git,
      rules.base.lint,
    ];

    // 添加前端框架相关规则
    if (hasNextJs) {
      rule.push(rules.frontend.nextjs);
      rule.push(rules.data.real);
    } else {
      rule.push(rules.data.mock);
    }
    rule.push(rules.frontend.config);

    // 添加数据相关规则
    if (allTechs.includes("Prisma")) {
      rule.push(rules.data.prisma);
      if (allTechs.includes("SQLite")) {
        rule.push(rules.data.sqlite);
      }
    }

    // 添加UI相关规则
    if (allTechs.includes("TailwindCSS")) {
      rule.push(rules.ui.tailwind);
      rule.push(rules.ui.tailwindCDN);
    }

    const ruleStr = rule.map((r, i) => `${i + 1}.${r}`).join("\n");

    // Get template
    const template = templateStore.getCurrentTemplate;

    // Replace variables in template
    generatedPrompt.value = templateStore.replaceTemplateVariables(template, {
      projectName: info.projectName,
      techStackStr,
      requirements: info.requirements,
      themeDescription,
      hasNextJs,
      rule: ruleStr,
    });

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
  };
});
