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
    },
    {
      name: "MERN技术栈",
      icon: "mongodb/mongodb-original.svg",
      description: "MongoDB + Express + React + Node.js",
      techs: ["MongoDB", "Express", "React", "Node.js", "JavaScript"],
    },
    {
      name: "Jamstack应用",
      icon: "nextjs/nextjs-original.svg",
      description: "Next.js + TailwindCSS + Supabase",
      techs: ["Next.js", "TailwindCSS", "Supabase", "TypeScript"],
    },
    {
      name: "独立开发React",
      icon: "react/react-original.svg",
      description: "React + TypeScript + TailwindCSS + Vite",
      techs: ["React", "TypeScript", "TailwindCSS", "Vite", "SWR", "daisyui"],
    },
    {
      name: "Python Web应用",
      icon: "python/python-original.svg",
      description: "Python + FastAPI + SQLite + React",
      techs: ["Python", "FastAPI", "SQLite", "React", "TailwindCSS"],
    },
    {
      name: "移动优先应用",
      icon: "tailwindcss/tailwindcss-original.svg",
      description: "React + TailwindCSS + React Query + Firebase",
      techs: ["React", "TailwindCSS", "React Query", "Firebase", "TypeScript"],
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
        category === "数据库",
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
    if (!combination) return [];

    return combination.techs;
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
