<script setup>
const props = defineProps({
  stepControl: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["prev-step", "next-step"]);

const prevStep = () => {
  emit("prev-step");
};

const nextStep = () => {
  emit("next-step");
};
</script>

<template>
  <div class="sticky-buttons flex justify-between pt-3">
    <button
      v-if="stepControl.currentStep > 1"
      @click="prevStep"
      class="btn px-6 py-2.5 bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-700/70 dark:hover:bg-gray-600/70 text-gray-800 dark:text-white rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-sm hover:shadow"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>上一步</span>
    </button>
    <button v-else class="invisible btn px-6 py-2.5"></button>

    <button
      @click="nextStep"
      class="btn px-6 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <span>{{ stepControl.isLastStep ? "生成提示词" : "下一步" }}</span>
      <svg
        v-if="!stepControl.isLastStep"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* 粘性底部按钮区样式 */
.sticky-buttons {
  position: sticky;
  bottom: 3vh; /* 距离底部至少10%的视口高度 */
  padding-bottom: 1rem;
  z-index: 10;
}

/* 为按钮添加微妙的悬浮动画 */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: translateY(-1px);
}
</style>
