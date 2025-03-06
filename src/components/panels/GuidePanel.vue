<script setup>
import GlassCard from "@/components/common/GlassCard.vue";

const icon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
</svg>`;
</script>

<template>
  <GlassCard :title="'使用指南'" :icon="icon">
    <div class="space-y-3 text-base-content/70 text-sm">
      <p>1. 在左侧面板中填写项目需求和技术栈</p>
      <p>2. 点击「生成提示词」按钮获取AI提示词</p>
      <p>3. 复制提示词并发送给AI助手</p>
      <p>4. 将AI返回的代码粘贴到「解析结果」面板</p>
      <p>5. 查看文件结构并可选择下载生成的项目文件</p>
    </div>
  </GlassCard>
</template>
