import { defineStore } from "pinia";
import { ref } from "vue";

export const useTechStackStore = defineStore("techStack", () => {
  // Tech stack configuration
  const techStackConfig = {
    // 前端框架
    "Next.js": {
      category: "前端框架",
      icon: "nextjs/nextjs-original.svg",
      description: "基于React的服务端渲染框架",
    },
    React: {
      category: "前端框架",
      icon: "react/react-original.svg",
      description: "Facebook开发的用户界面库",
    },
    "Vue.js": {
      category: "前端框架",
      icon: "vuejs/vuejs-original.svg",
      description: "渐进式JavaScript框架",
    },
    Angular: {
      category: "前端框架",
      icon: "angularjs/angularjs-original.svg",
      description: "Google开发的TypeScript框架",
    },
    Svelte: {
      category: "前端框架",
      icon: "svelte/svelte-original.svg",
      description: "编译时前端框架",
    },
    "Nuxt.js": {
      category: "前端框架",
      icon: "nuxtjs/nuxtjs-original.svg",
      description: "基于Vue.js的通用应用框架",
    },
    Astro: {
      category: "前端框架",
      icon: "javascript/javascript-original.svg",
      description: "现代静态站点构建器",
    },
    "Solid.js": {
      category: "前端框架",
      icon: "javascript/javascript-original.svg",
      description: "声明式、高效的UI库",
    },

    // 语言
    TypeScript: {
      category: "语言",
      icon: "typescript/typescript-original.svg",
      description: "JavaScript的超集，添加了类型系统",
    },
    JavaScript: {
      category: "语言",
      icon: "javascript/javascript-original.svg",
      description: "网页交互的脚本语言",
    },
    Python: {
      category: "语言",
      icon: "python/python-original.svg",
      description: "通用、高级编程语言",
    },
    Rust: {
      category: "语言",
      icon: "rust/rust-plain.svg",
      description: "注重安全性的系统编程语言",
    },
    Go: {
      category: "语言",
      icon: "go/go-original.svg",
      description: "高效、并发的编程语言",
    },

    // UI框架/库
    TailwindCSS: {
      category: "UI框架/库",
      icon: "tailwindcss/tailwindcss-original.svg",
      description: "实用类优先的CSS框架",
    },
    daisyui: {
      category: "UI框架/库",
      icon: "tailwindcss/tailwindcss-original.svg", // 使用Tailwind图标
      description: "Tailwind CSS组件库",
    },
    shadcn: {
      category: "UI框架/库",
      icon: "react/react-original.svg", // 使用React图标
      description: "可重用的React组件库",
    },
    "Material-UI": {
      category: "UI框架/库",
      icon: "materialui/materialui-original.svg",
      description: "Google Material设计的React组件",
    },
    "Ant Design": {
      category: "UI框架/库",
      icon: "react/react-original.svg", // 使用React图标
      description: "企业级UI设计语言和React组件库",
    },
    Bootstrap: {
      category: "UI框架/库",
      icon: "bootstrap/bootstrap-plain.svg",
      description: "流行的CSS框架和组件库",
    },
    "Chakra UI": {
      category: "UI框架/库",
      icon: "react/react-original.svg", // 使用React图标
      description: "模块化和可访问的React组件库",
    },
    NaiveUI: {
      category: "UI框架/库",
      icon: "tailwindcss/tailwindcss-original.svg",
      description: "Vue 3的组件库",
    },
    UnoCSS: {
      category: "UI框架/库",
      icon: "tailwindcss/tailwindcss-original.svg",
      description: "即时原子CSS引擎",
    },
    "Element Plus": {
      category: "UI框架/库",
      icon: "vuejs/vuejs-original.svg",
      description: "Vue 3的组件库",
    },
    Vuetify: {
      category: "UI框架/库",
      icon: "vuejs/vuejs-original.svg",
      description: "Vue的Material Design组件框架",
    },

    // 数据库
    Prisma: {
      category: "数据库",
      icon: "nodejs/nodejs-original.svg", // 使用Node图标
      description: "现代数据库ORM工具",
    },
    MongoDB: {
      category: "数据库",
      icon: "mongodb/mongodb-original.svg",
      description: "流行的NoSQL文档数据库",
    },
    PostgreSQL: {
      category: "数据库",
      icon: "postgresql/postgresql-original.svg",
      description: "强大的开源关系型数据库",
    },
    SQLite: {
      category: "数据库",
      icon: "sqlite/sqlite-original.svg",
      description: "轻量级嵌入式关系型数据库",
    },
    MySQL: {
      category: "数据库",
      icon: "mysql/mysql-original.svg",
      description: "最流行的开源关系型数据库",
    },
    Supabase: {
      category: "数据库",
      icon: "postgresql/postgresql-original.svg", // 使用PostgreSQL图标
      description: "开源的Firebase替代品",
    },
    Firebase: {
      category: "数据库",
      icon: "firebase/firebase-plain.svg",
      description: "Google的应用开发平台",
    },

    // 状态管理
    Redux: {
      category: "状态管理",
      icon: "redux/redux-original.svg",
      description: "JavaScript应用的状态容器",
    },
    Zustand: {
      category: "状态管理",
      icon: "react/react-original.svg", // 使用React图标
      description: "简单的React状态管理库",
    },
    MobX: {
      category: "状态管理",
      icon: "react/react-original.svg", // 使用React图标
      description: "简单、可扩展的状态管理库",
    },
    XState: {
      category: "状态管理",
      icon: "javascript/javascript-original.svg", // 使用JS图标
      description: "JavaScript的状态机和状态图库",
    },
    Recoil: {
      category: "状态管理",
      icon: "react/react-original.svg", // 使用React图标
      description: "Facebook的React状态管理库",
    },
    Pinia: {
      category: "状态管理",
      icon: "vuejs/vuejs-original.svg", // 使用Vue图标
      description: "Vue的状态管理库",
    },

    // 请求/数据获取
    Axios: {
      category: "请求/数据获取",
      icon: "nodejs/nodejs-original.svg", // 使用Node图标
      description: "基于Promise的HTTP客户端",
    },
    SWR: {
      category: "请求/数据获取",
      icon: "react/react-original.svg", // 使用React图标
      description: "React Hooks用于数据获取",
    },
    "React Query": {
      category: "请求/数据获取",
      icon: "react/react-original.svg", // 使用React图标
      description: "React数据获取和缓存库",
    },
    Apollo: {
      category: "请求/数据获取",
      icon: "graphql/graphql-plain.svg", // 使用GraphQL图标
      description: "GraphQL客户端和服务器库",
    },
    "RTK Query": {
      category: "请求/数据获取",
      icon: "redux/redux-original.svg", // 使用Redux图标
      description: "Redux工具包的数据获取工具",
    },
    "fetch API": {
      category: "请求/数据获取",
      icon: "javascript/javascript-original.svg", // 使用JS图标
      description: "浏览器原生HTTP请求API",
    },

    // 后端技术
    "Node.js": {
      category: "后端技术",
      icon: "nodejs/nodejs-original.svg",
      description: "JavaScript运行时环境",
    },
    Express: {
      category: "后端技术",
      icon: "express/express-original.svg",
      description: "Node.js的Web应用框架",
    },
    FastAPI: {
      category: "后端技术",
      icon: "python/python-original.svg", // 使用Python图标
      description: "现代、快速的Python Web框架",
    },
    Django: {
      category: "后端技术",
      icon: "django/django-plain.svg",
      description: "Python高级Web框架",
    },
    "Spring Boot": {
      category: "后端技术",
      icon: "spring/spring-original.svg",
      description: "Java应用开发框架",
    },
    Laravel: {
      category: "后端技术",
      icon: "laravel/laravel-plain.svg",
      description: "PHP Web应用框架",
    },
    NestJS: {
      category: "后端技术",
      icon: "nestjs/nestjs-plain.svg",
      description: "构建高效、可扩展的Node.js服务器端应用的框架",
    },

    // DevOps工具
    Docker: {
      category: "DevOps工具",
      icon: "docker/docker-original.svg",
      description: "应用容器化平台",
    },
    "GitHub Actions": {
      category: "CI/CD",
      icon: "githubactions/githubactions-original.svg",
      description: "GitHub内置的CI/CD工具",
    },

    // Web服务器
    Nginx: {
      category: "Web服务器",
      icon: "nginx/nginx-original.svg",
      description: "高性能Web服务器和反向代理服务器",
    },
    Uvicorn: {
      category: "Web服务器",
      icon: "python/python-original.svg", // No specific Uvicorn icon on devicon
      description: "ASGI服务器，常用于FastAPI等Python异步框架",
    },
    
    // 数据库 (เพิ่มเติม)
    Redis: {
      category: "数据库",
      icon: "redis/redis-original.svg",
      description: "内存数据结构存储，用作数据库、缓存和消息代理",
    },

    // 测试工具
    Jest: {
      category: "测试工具",
      icon: "jest/jest-plain.svg",
      description: "流行的JavaScript测试框架，专注于简洁性",
    },
    Playwright: {
      category: "测试工具",
      icon: "playwright/playwright-original.svg",
      description: "微软开发的端到端测试框架，支持多浏览器",
    },

    // 构建工具
    Vite: {
      category: "构建工具",
      icon: "vitejs/vitejs-original.svg",
      description: "下一代前端构建工具，提供极速的冷启动和热模块替换（HMR）",
    },

    // 消息队列
    RabbitMQ: {
      category: "消息队列",
      icon: "rabbitmq/rabbitmq-original.svg",
      description: "流行的开源消息代理，实现了AMQP协议",
    },
  };

  // 技术栈组合配置
  const techStackCombinations = [
    {
      name: "React全栈开发",
      icon: "react/react-original.svg",
      description: "React + TypeScript + Next.js + Tailwind + Prisma",
      techs: [
        "React",
        "TypeScript",
        "Next.js",
        "TailwindCSS",
        "Prisma",
        "SQLite",
      ],
      bestPractices: [
        "使用React Server Components减少客户端JavaScript体积",
        "遵循Next.js页面和数据获取最佳实践（App Router）",
        "组件设计遵循SOLID原则，特别是单一职责",
        "使用TypeScript严格模式提高代码质量",
        "数据持久化逻辑与UI逻辑严格分离",
        "使用Prisma迁移功能管理数据库架构",
        "实现增量静态再生成(ISR)提高性能",
        "使用React Context和useReducer管理全局状态",
      ],
    },
    {
      name: "React前端开发",
      icon: "react/react-original.svg",
      description: "React + JavaScript + Redux + Material UI",
      techs: [
        "React",
        "JavaScript",
        "Redux",
        "Material-UI",
        "Axios",
        "React Query",
      ],
      bestPractices: [
        "使用函数组件和Hooks代替类组件",
        "使用懒加载(React.lazy)和代码分割优化性能",
        "实现合适的状态管理策略，避免prop drilling",
        "创建可复用的自定义Hooks封装逻辑",
        "使用memo、useCallback和useMemo优化渲染性能",
        "采用组件驱动开发方法，从小组件开始构建",
        "使用ESLint和Prettier保持代码质量和一致性",
      ],
    },
    {
      name: "Vue现代应用",
      icon: "vuejs/vuejs-original.svg",
      description: "Vue.js + TypeScript + TailwindCSS + Pinia",
      techs: [
        "Vue.js",
        "TypeScript",
        "TailwindCSS",
        "NaiveUI",
        "Pinia",
        "Axios",
      ],
      bestPractices: [
        "使用组合式API和<script setup>语法简化组件",
        "使用defineProps和defineEmits进行组件通信",
        "按功能组织目录结构而非按类型",
        "在响应式数据声明中使用解构会丢失响应性，应避免",
        "使用Pinia代替Vuex管理状态，利用其模块化设计",
        "使用Vue Router的动态导入实现代码分割",
        "应用Axios拦截器统一处理请求和响应",
        "组件使用宏命令definePage定义路由元信息",
      ],
    },
    {
      name: "MERN技术栈",
      icon: "mongodb/mongodb-original.svg",
      description: "MongoDB + Express + React + Node.js",
      techs: ["MongoDB", "Express", "React", "Node.js", "Redux Toolkit"],
      bestPractices: [
        "使用JWT实现身份验证和授权",
        "采用MVC架构组织Express后端代码",
        "MongoDB集合设计时考虑数据内嵌与引用的取舍",
        "实现API请求的错误处理中间件",
        "使用Redux Toolkit简化状态管理",
        "前后端分离部署，允许独立扩展",
        "使用环境变量管理敏感配置",
        "实现React懒加载和React.memo优化性能",
      ],
    },
    {
      name: "LAMP传统架构",
      icon: "php/php-original.svg",
      description: "Linux + Apache + MySQL + PHP/Laravel",
      techs: ["PHP", "MySQL", "Laravel", "jQuery", "Bootstrap"],
      bestPractices: [
        "使用Laravel的Eloquent ORM避免SQL注入",
        "实现Laravel中间件处理认证和授权",
        "应用Laravel Blade模板引擎减少重复代码",
        "使用Laravel Mix简化资源编译",
        "实现Laravel队列处理耗时任务",
        "使用事件和监听器解耦业务逻辑",
        "应用Laravel Passport或Sanctum处理API认证",
        "实现Laravel数据库迁移和种子文件",
      ],
    },
    {
      name: "Python Web开发",
      icon: "python/python-original.svg",
      description: "Python + Django/FastAPI + PostgreSQL",
      techs: ["Python", "Django", "PostgreSQL", "Bootstrap"],
      bestPractices: [
        "遵循Django MTV架构模式",
        "使用Django ORM处理数据库操作",
        "实现Django表单验证和CSRF保护",
        "应用Django模板继承减少重复代码",
        "使用Django信号实现事件驱动编程",
        "实现Django中间件处理请求和响应",
        "正确配置Django静态文件和媒体文件处理",
      ],
    },
    {
      name: "移动优先应用",
      icon: "tailwindcss/tailwindcss-original.svg",
      description: "React + TailwindCSS + React Query + Firebase",
      techs: ["React", "TailwindCSS", "React Query", "Firebase", "TypeScript"],
      bestPractices: [
        "实现响应式设计，优先考虑移动端用户体验",
        "使用移动端手势操作库提升交互体验",
        "优化应用资源加载，减少首屏加载时间",
        "实现渐进式Web应用(PWA)功能，支持离线访问",
        "使用Firebase实时数据库实现即时通讯功能",
        "实现懒加载和图片优化，减少移动端流量消耗",
        "针对不同设备尺寸进行布局优化和测试",
        "使用React Query管理远程状态和API缓存策略",
      ],
    },
    {
      name: "Vue3企业应用",
      icon: "vuejs/vuejs-original.svg",
      description: "Vue.js + Element Plus + Pinia + Axios",
      techs: [
        "Vue.js",
        "TypeScript",
        "Element Plus",
        "Pinia",
        "Axios",
        "Node.js",
      ],
      bestPractices: [
        "使用TypeScript接口定义组件props和状态类型",
        "采用基于文件的路由系统和懒加载优化首屏加载",
        "实现微前端架构，支持大型团队协作开发",
        "使用Pinia模块化管理复杂状态，实现持久化存储",
        "封装Element Plus组件，创建符合企业设计规范的组件库",
        "构建完善的权限控制系统，包括菜单、按钮和API权限",
      ],
    },
    {
      name: "纯前端 - Vue SPA",
      icon: "vuejs/vuejs-original.svg",
      description: "Vue.js (v3) + TypeScript + Pinia + Vue Router + Vite + TailwindCSS",
      techs: [
        "Vue.js",
        "TypeScript",
        "Pinia",
        "Axios", // For API calls
        "TailwindCSS",
        "Vite",
        "Jest", // For unit testing
      ],
      bestPractices: [
        "使用组合式API (<script setup>) 组织代码逻辑，增强可读性和复用性。",
        "通过Vue Router (v4) 实现模块化和懒加载的路由，优化初始加载速度。",
        "使用Pinia进行状态管理，确保模块化、类型安全和良好的DevTools支持。",
        "利用Vite的快速冷启动和HMR (Hot Module Replacement) 进行高效开发。",
        "组件设计遵循单一职责原则 (SRP) 和高内聚低耦合，提高可维护性和可复用性。",
        "为重要的业务逻辑和组件编写单元测试 (e.g., using Vitest or Jest)。",
        "使用TailwindCSS构建一致且响应式的用户界面，配合PurgeCSS优化生产构建体积。",
        "定义清晰的API服务层，统一处理HTTP请求和响应 (e.g., using Axios instances)。",
        "遵循Vue.js官方推荐的风格指南，确保代码一致性。",
        "利用TypeScript的强类型系统减少运行时错误。",
      ],
    },
    {
      name: "全栈 - FastAPI + Svelte",
      icon: "python/python-original.svg",
      description: "FastAPI (Python) + Svelte (TypeScript) + PostgreSQL + Docker + Nginx",
      techs: [
        "Python",
        "FastAPI",
        "Svelte",
        "TypeScript",
        "PostgreSQL",
        "Docker",
        "Nginx",
        "Uvicorn",
        "Vite", // For Svelte frontend
        "Playwright", // For E2E testing
      ],
      bestPractices: [
        "使用Pydantic模型进行FastAPI的数据验证、序列化和自动生成API文档。",
        "通过Docker容器化前端和后端应用，使用Docker Compose编排本地开发环境，简化部署。",
        "使用Nginx作为反向代理、负载均衡器和静态文件服务器。",
        "Svelte前端项目使用Vite进行构建和开发，利用其高效的HMR和tree-shaking。",
        "数据库操作使用异步ORM (e.g., SQLAlchemy async or databases library with encode/databases)。",
        "API设计遵循RESTful或GraphQL原则，提供清晰、一致的接口。",
        "前后端代码库分离，通过CI/CD流程 (e.g., GitHub Actions) 自动化构建、测试和部署。",
        "考虑使用Alembic进行PostgreSQL数据库模式迁移管理。",
        "实现全面的API测试，包括单元测试、集成测试和端到端测试 (e.g., Pytest for backend, Playwright for E2E)。",
        "实施日志记录和监控策略，例如使用ELK栈或Prometheus/Grafana。",
        "FastAPI应用部署时使用Uvicorn配合Gunicorn进行生产环境管理。",
      ],
    },
    {
      name: "后端 - Node.js Microservice (NestJS)",
      icon: "nestjs/nestjs-plain.svg",
      description: "NestJS (Node.js/TypeScript) + MongoDB + Docker + RabbitMQ for event-driven architecture",
      techs: [
        "Node.js",
        "TypeScript",
        "NestJS",
        "MongoDB",
        "Docker",
        "RabbitMQ",
        "Jest", // For unit and integration testing
        "Nginx", // As API Gateway or reverse proxy
      ],
      bestPractices: [
        "遵循NestJS的模块化架构，按领域或功能组织微服务。",
        "使用TypeScript实现类型安全，并利用装饰器简化代码。",
        "通过DTOs (Data Transfer Objects) 和 class-validator/class-transformer 进行API输入输出验证和转换。",
        "集成Mongoose与MongoDB进行数据持久化，定义清晰的Schema。",
        "使用RabbitMQ等消息队列进行服务间异步通信和事件驱动设计。",
        "编写全面的单元测试、集成测试和契约测试 (e.g., using Jest, Supertest, Pact)。",
        "通过Docker容器化微服务，使用Kubernetes或Docker Swarm进行编排和扩展。",
        "使用Helmet等库增强应用安全性，配置CORS策略。",
        "配置结构化日志记录 (e.g., Winston) 和分布式追踪 (e.g., Jaeger/Zipkin)。",
        "实现健康检查端点，便于服务监控和管理。",
        "使用API Gateway (e.g., Nginx or dedicated solutions like Kong/Ocelot) 统一入口和管理跨域请求。",
        "应用六边形架构（端口和适配器）分离业务逻辑与基础设施依赖。",
      ],
    },
  ];

  // Generate categories from config
  const generateTechCategories = () => {
    const categories = {};

    // Collect all categories
    Object.entries(techStackConfig).forEach(([tech, config]) => {
      if (!categories[config.category]) {
        categories[config.category] = [];
      }
      categories[config.category].push(tech);
    });

    // Convert to array format
    return Object.entries(categories).map(([category, techs]) => ({
      name: category,
      techs: techs,
      open:
        category === "前端框架" ||
        category === "语言" ||
        category === "UI框架/库" ||
        category === "数据库" ||
        category === "后端技术" || // Keep backend open
        category === "DevOps工具" || // Keep DevOps open
        category === "Web服务器", // Keep Web Servers open
    }));
  };

  // State
  const techCategories = ref(generateTechCategories());

  // Actions
  function toggleCategory(index) {
    techCategories.value[index].open = !techCategories.value[index].open;
  }

  function toggleAllCategories(open) {
    techCategories.value.forEach((category) => {
      category.open = open;
    });
  }

  function getTechIconUrl(techName) {
    if (techStackConfig[techName] && techStackConfig[techName].icon) {
      return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techStackConfig[techName].icon}`;
    }

    // Default icon
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  }

  function getTechDescription(techName) {
    return techStackConfig[techName]?.description || "";
  }

  function selectTechCombination(combinationName) {
    const combination = techStackCombinations.find(
      (combo) => combo.name === combinationName
    );

    if (combination) {
      // 打开包含这些技术的分类
      techCategories.value.forEach((category, index) => {
        const hasTech = category.techs.some((tech) =>
          combination.techs.includes(tech)
        );
        if (hasTech) {
          category.expanded = true;
        }
      });

      // 返回技术栈列表和最佳实践
      return {
        techs: [...combination.techs],
        bestPractices: combination.bestPractices || [],
      };
    }

    return {
      techs: [],
      bestPractices: [],
    };
  }

  return {
    techCategories,
    toggleCategory,
    toggleAllCategories,
    getTechIconUrl,
    getTechDescription,
    techStackCombinations,
    selectTechCombination,
  };
});
