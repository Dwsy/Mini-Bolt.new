<script setup>
import { ref } from 'vue'
import { useFileStore } from '@/stores/files'
import { useNotificationStore } from '@/stores/notification'

const emit = defineEmits(['parsed'])

const fileStore = useFileStore()
const notificationStore = useNotificationStore()

// Local state
const parseInput = ref('')
const parseError = ref('')

// Methods
const parseCode = async () => {
  if (!parseInput.value.trim()) {
    notificationStore.show('error', '请填写解析内容', '请粘贴AI生成的代码')
    return
  }
  
  try {
    parseError.value = ''
    
    const result = await fileStore.parseCode(parseInput.value)
    
    if (result.success) {
      notificationStore.show('success', '解析成功', `共解析出 ${fileStore.parsedFiles.length} 个文件`)
      emit('parsed')
    } else {
      parseError.value = result.error || '解析失败，请检查输入格式'
      notificationStore.show('error', '解析失败', parseError.value)
    }
  } catch (error) {
    parseError.value = `解析出错: ${error.message}`
    notificationStore.show('error', '解析失败', error.message)
  }
}
</script>

<template>
  <div class="space-y-4">
    <textarea 
      v-model="parseInput" 
      placeholder="将AI返回的回复粘贴到这里..." 
      rows="16" 
      class="textarea textarea-bordered w-full bg-base-200 dark:bg-base-300 custom-scrollbar"
    ></textarea>
    
    <button 
      @click="parseCode" 
      class="btn btn-primary w-full"
    >
      解析模型回复
    </button>
    
    <div 
      v-if="parseError" 
      class="bg-error/20 border border-error/30 rounded-md p-4 text-error text-sm"
    >
      {{ parseError }}
    </div>
  </div>
</template>