/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5", // 鲜明的靛蓝色，现代感强
          focus: "#4338CA", // 深一点的靛蓝色用于悬停和焦点状态
          content: "#ffffff", // 白色文字，确保可读性
        },
        secondary: {
          DEFAULT: "#8B5CF6", // 紫色，与靛蓝色搭配和谐
          focus: "#7C3AED", // 深一点的紫色
          content: "#ffffff",
        },
        accent: {
          DEFAULT: "#F59E0B", // 保留原橙黄色作为强调色
          focus: "#D97706", // 深一点的橙色
          content: "#ffffff",
        },
        neutral: {
          DEFAULT: "#1E293B", // 调整为更柔和的深蓝灰色
          focus: "#0F172A", // 更深但不太暗的蓝黑色
          content: "#f9fafb", // 浅色文本
        },
      },
      fontFamily: {
        sans: ["Noto Sans SC", "Inter", "sans-serif"],
      },
      backgroundColor: {
        "gray-750": "#2d3748",
        "claude-light": "#F5F3EA",
        "claude-message": "#F5F5F0",
        "user-message": "#F0F9F6",
      },
      boxShadow: {
        "glass-light":
          "0 4px 16px -1px rgba(0, 0, 0, 0.05), 0 2px 8px -1px rgba(0, 0, 0, 0.03)",
        "glass-dark":
          "0 4px 16px -1px rgba(0, 0, 0, 0.15), 0 2px 8px -1px rgba(0, 0, 0, 0.08)",
        subtle:
          "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.02)",
        "claude-card":
          "0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.625rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        claude: "0.625rem",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "bounce-out": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#4F46E5",
          secondary: "#8B5CF6",
          accent: "#F59E0B",
          neutral: "#f7f9fc",
          "base-100": "#ffffff",
          "base-200": "#f1f5fb",
          "base-300": "#e9eef8",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#818CF8", // 更亮更柔和的靛蓝色
          secondary: "#C4B5FD", // 更柔和的紫色
          accent: "#FCD34D", // 明亮温暖的黄色
          neutral: "#1F2937", // 更自然的深灰色
          "base-100": "#111827", // 更自然的深色背景
          "base-200": "#0D1520", // 稍深的背景色
          "base-300": "#0A1018", // 更深的背景色，但不太黑
          "neutral-content": "#E5E7EB", // 更柔和的文字颜色
          "--rounded-box": "0.5rem", // 圆角更自然
          "--rounded-btn": "0.375rem", // 按钮圆角更协调
        },
      },
    ],
  },
};
