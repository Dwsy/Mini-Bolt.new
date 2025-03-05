<script setup>
import { usePromptStore } from '@/stores/prompt'
import { useNotificationStore } from '@/stores/notification'

const promptStore = usePromptStore()
const notificationStore = useNotificationStore()

// Methods
const generatePrompt = () => {
  promptStore.regeneratePrompt()
  notificationStore.show('success', '提示词已重新生成', '您可以复制提示词并发送给AI助手')
}

const copyPrompt = () => {
  if (!promptStore.generatedPrompt) return
  
  navigator.clipboard.writeText(promptStore.generatedPrompt)
    .then(() => {
      notificationStore.show('success', '复制成功', '提示词已复制到剪贴板')
    })
    .catch(err => {
      notificationStore.show('error', '复制失败', err.message || '请手动选择文本并复制')
    })
}
</script>

<template>
  <div class="space-y-4">
    <textarea 
      v-model="promptStore.generatedPrompt" 
      placeholder="在此编辑提示词..." 
      rows="12" 
      class="textarea textarea-bordered w-full bg-base-200 dark:bg-base-300 custom-scrollbar"
    ></textarea>
    
    <div class="flex justify-between">
      <button 
        @click="generatePrompt" 
        class="btn btn-primary"
      >
        生成提示词
      </button>
      
      <button 
        @click="copyPrompt" 
        class="btn btn-neutral"
        :disabled="!promptStore.generatedPrompt"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
        </svg>
        复制提示词
      </button>
    </div>
  </div>
</template>