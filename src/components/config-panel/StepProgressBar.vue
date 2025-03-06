<script setup>
defineProps({
  stepControl: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["step-click"]);

const handleStepClick = (step) => {
  emit("step-click", step);
};
</script>

<template>
  <div
    class="relative overflow-hidden backdrop-blur-sm rounded-xl shadow-2xl border dark:border-gray-700/30 border-white/20 bg-white/80 dark:bg-gray-800/50"
  >
    <!-- 进度条 -->
    <div class="relative h-1.5 w-full bg-gray-200 dark:bg-gray-700/70">
      <div
        class="absolute h-full bg-gradient-to-r from-primary via-primary/90 to-secondary transition-all duration-500 ease-out"
        :style="`width: ${stepControl.stepProgress}%`"
      ></div>
    </div>

    <!-- 步骤标题 -->
    <div class="p-6">
      <h2
        class="text-xl font-bold text-gray-800 dark:text-white flex items-center"
      >
        <span
          class="flex items-center justify-center w-9 h-9 mr-3 rounded-lg bg-gradient-to-br from-primary to-secondary text-white text-sm shadow-lg shadow-primary/20 dark:shadow-primary/10"
        >
          {{ stepControl.currentStep }}
        </span>
        <span
          class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-primary/90 dark:to-secondary/90 font-extrabold"
        >
          <span v-if="stepControl.currentStep === 1">项目基本信息</span>
          <span v-else-if="stepControl.currentStep === 2">技术栈选择</span>
          <span v-else-if="stepControl.currentStep === 3">项目需求描述</span>
          <span v-else-if="stepControl.currentStep === 4">设计风格选择</span>
        </span>
      </h2>
    </div>

    <!-- 步骤指示器 -->
    <div class="flex px-6 pb-5">
      <div
        v-for="step in stepControl.totalSteps"
        :key="step"
        class="flex items-center"
        :class="step < stepControl.totalSteps ? 'flex-1' : ''"
      >
        <button
          @click="handleStepClick(step)"
          class="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm"
          :class="[
            step < stepControl.currentStep
              ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20 dark:shadow-primary/10'
              : step === stepControl.currentStep
              ? 'ring-2 ring-primary/70 ring-offset-2 dark:ring-offset-gray-800 bg-white dark:bg-gray-700 text-primary font-bold shadow-md shadow-primary/10 dark:shadow-primary/5'
              : 'bg-gray-200/70 dark:bg-gray-700/70 text-gray-500 hover:bg-gray-300/70 dark:hover:bg-gray-600/70',
          ]"
        >
          <span v-if="step < stepControl.currentStep">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span v-else>{{ step }}</span>
          <span
            class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            :class="
              step === stepControl.currentStep
                ? 'text-primary'
                : 'text-gray-500 dark:text-gray-400'
            "
          >
            {{ stepControl.getStepLabel(step) }}
          </span>
        </button>
        <div
          v-if="step < stepControl.totalSteps"
          class="flex-1 h-0.5 mx-2"
          :class="[
            step < stepControl.currentStep
              ? 'bg-gradient-to-r from-primary to-secondary'
              : 'bg-gray-200 dark:bg-gray-700/70',
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>
