import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  // State
  const notification = ref({
    show: false,
    type: 'info',
    title: '',
    message: '',
    timeout: null
  })
  
  // Actions
  function show(type, title, message, duration = 3000) {
    // Clear any existing timeout
    if (notification.value.timeout) {
      clearTimeout(notification.value.timeout)
    }
    
    // Set new notification
    notification.value = {
      show: true,
      type,
      title,
      message,
      timeout: null
    }
    
    // Set auto-close
    notification.value.timeout = setTimeout(() => {
      hide()
    }, duration)
  }
  
  function hide() {
    notification.value.show = false
  }
  
  return {
    notification,
    show,
    hide
  }
})