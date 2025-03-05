<script setup>
import { useNotificationStore } from "@/stores/notification";

const notificationStore = useNotificationStore();
</script>

<template>
  <div
    class="fixed top-4 left-1/2 transform -translate-x-1/2 max-w-md z-[9999]"
  >
    <Transition name="notification-slide">
      <div
        v-if="notificationStore.notification.show"
        class="glass-effect rounded-lg p-5 text-base-content flex items-start shadow-lg border border-white/10"
        :class="{
          'bg-success/15 text-success border-success/20':
            notificationStore.notification.type === 'success',
          'bg-error/15 text-error border-error/20':
            notificationStore.notification.type === 'error',
          'bg-info/15 text-info border-info/20':
            notificationStore.notification.type === 'info',
        }"
      >
        <div class="mr-4 mt-0.5">
          <svg
            v-if="notificationStore.notification.type === 'success'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else-if="notificationStore.notification.type === 'error'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 100-2H9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div>
          <p class="font-semibold text-base mb-1">
            {{ notificationStore.notification.title }}
          </p>
          <p class="text-sm opacity-90">
            {{ notificationStore.notification.message }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.notification-slide-enter-active,
.notification-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.notification-slide-enter-from {
  transform: translate(-50%, -20px);
  opacity: 0;
}
.notification-slide-leave-to {
  transform: translate(-50%, -20px);
  opacity: 0;
}
.glass-effect {
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
</style>
