import { ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'

export function useClipboard() {
  const notificationStore = useNotificationStore()
  const copyingState = ref({
    isCopying: false,
    success: false
  })

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @param {string} successTitle - Title for success notification
   * @param {string} successMessage - Message for success notification
   * @param {string} errorTitle - Title for error notification
   * @returns {Promise<boolean>} Success status
   */
  const copyToClipboard = async (
    text, 
    successTitle = '复制成功', 
    successMessage = '内容已复制到剪贴板',
    errorTitle = '复制失败'
  ) => {
    if (!text) return false
    
    copyingState.value = {
      isCopying: true,
      success: false
    }
    
    try {
      await navigator.clipboard.writeText(text)
      
      copyingState.value = {
        isCopying: false,
        success: true
      }
      
      notificationStore.show('success', successTitle, successMessage)
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        copyingState.value.success = false
      }, 2000)
      
      return true
    } catch (err) {
      copyingState.value = {
        isCopying: false,
        success: false
      }
      
      notificationStore.show(
        'error', 
        errorTitle, 
        err.message || '请手动选择文本并复制'
      )
      
      return false
    }
  }
  
  return {
    copyingState,
    copyToClipboard
  }
}