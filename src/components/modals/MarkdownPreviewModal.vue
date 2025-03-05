<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMarkdown } from '@/composables/useMarkdown'
import { useNotificationStore } from '@/stores/notification'
import ModalWrapper from '@/components/modals/ModalWrapper.vue'

const emit = defineEmits(['close'])

const notificationStore = useNotificationStore()
const { renderMarkdown, markdownOptions, toggleMarkdownOption } = useMarkdown()

// Local state
const markdownText = ref('')
const initialContent = ref('')

// Computed properties
const parsedMarkdown = computed(() => {
  return renderMarkdown(markdownText.value)
})

// Methods
const saveMarkdownAsHTML = () => {
  try {
    // 创建完整的HTML文档
    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown 导出</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            color: #2563eb;
        }
        h1 {
            font-size: 2rem;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 0.5rem;
        }
        h2 {
            font-size: 1.8rem;
        }
        h3 {
            font-size: 1.5rem;
        }
        a {
            color: #2563eb;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        pre {
            background-color: #f1f5f9;
            padding: 1rem;
            border-radius: 0.25rem;
            overflow-x: auto;
            font-family: monospace;
        }
        code {
            font-family: monospace;
            background-color: #f1f5f9;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.9em;
        }
        pre code {
            background-color: transparent;
            padding: 0;
        }
        blockquote {
            border-left: 4px solid #6366f1;
            padding-left: 1rem;
            margin-left: 0;
            color: #4b5563;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 1rem;
        }
        th, td {
            border: 1px solid #d1d5db;
            padding: 0.5rem;
        }
        th {
            background-color: #e5e7eb;
        }
        img {
            max-width: 100%;
        }
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #1f2937;
                color: #f9fafb;
            }
            h1, h2, h3, h4, h5, h6 {
                color: #6366f1;
            }
            h1 {
                border-bottom: 2px solid #374151;
            }
            a {
                color: #818cf8;
            }
            pre, code {
                background-color: #111827;
            }
            blockquote {
                color: #9ca3af;
            }
            th, td {
                border: 1px solid #374151;
            }
            th {
                background-color: #1f2937;
            }
        }
    </style>
</head>
<body>
    ${parsedMarkdown.value}
</body>
</html>`;
    
    // 创建Blob对象
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // 设置下载文件名
    a.download = 'markdown-export.html';
    
    // 模拟点击下载
    document.body.appendChild(a);
    a.click();
    
    // 清理
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    notificationStore.show('success', '导出成功', 'Markdown已导出为HTML文件');
  } catch (error) {
    console.error('导出HTML失败:', error);
    notificationStore.show('error', '导出失败', error.message || '无法导出HTML文件');
  }
}

// 初始化处理
onMounted(() => {
  // 从父组件接收传入的markdown内容
  markdownText.value = initialContent.value || '# Markdown预览\n\n请提供Markdown内容进行预览。';
})
</script>

<template>
  <ModalWrapper
    title="Markdown 预览"
    @close="emit('close')"
  >
    <template #header-actions>
      <button 
        @click="saveMarkdownAsHTML" 
        class="btn btn-sm btn-success"
        title="保存为HTML文件"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        导出HTML
      </button>
      
      <div class="flex items-center space-x-2">
        <label class="text-sm text-base-content/60">自动链接</label>
        <input 
          type="checkbox" 
          :checked="markdownOptions.gfm" 
          @change="toggleMarkdownOption('gfm')" 
          class="toggle toggle-primary toggle-sm"
        />
      </div>
      
      <div class="flex items-center space-x-2">
        <label class="text-sm text-base-content/60">表格支持</label>
        <input 
          type="checkbox" 
          :checked="markdownOptions.tables" 
          @change="toggleMarkdownOption('tables')" 
          class="toggle toggle-primary toggle-sm"
        />
      </div>
    </template>
    
    <div class="p-4 max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar">
      <div class="markdown-preview bg-base-100 dark:bg-base-200 rounded-lg p-6" v-html="parsedMarkdown"></div>
      
      <!-- Markdown源码预览 -->
      <details class="collapse collapse-arrow mt-4 bg-base-200 dark:bg-base-300 rounded-lg overflow-hidden">
        <summary class="collapse-title text-sm">查看Markdown源码</summary>
        <div class="collapse-content">
          <pre class="text-xs text-base-content/70 font-mono overflow-auto custom-scrollbar max-h-60">{{ markdownText }}</pre>
        </div>
      </details>
    </div>
  </ModalWrapper>
</template>