<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isMvpMode = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div
    class="mt-5 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-100/60 dark:border-indigo-800/30"
  >
    <!-- 标题栏 -->
    <div
      class="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 px-4 py-2.5 flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-5 h-5 text-primary dark:text-primary/90 mr-2"
      >
        <path
          fill-rule="evenodd"
          d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
          clip-rule="evenodd"
        />
      </svg>
      <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-100">
        MVP 最小可行版本模式
      </h4>
    </div>

    <!-- 内容区 -->
    <div class="px-4 py-3 bg-white/80 dark:bg-gray-800/80">
      <div class="flex items-start">
        <!-- 自定义漂亮的切换开关 -->
        <div class="relative inline-block mr-3 flex-shrink-0">
          <input
            type="checkbox"
            id="mvp-mode-toggle"
            v-model="isMvpMode"
            class="sr-only"
          />
          <label
            for="mvp-mode-toggle"
            class="block w-10 h-6 rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
            :class="
              isMvpMode
                ? 'bg-gradient-to-r from-primary to-secondary'
                : 'bg-gray-300 dark:bg-gray-600'
            "
          >
            <span
              class="relative block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out"
              :class="isMvpMode ? 'translate-x-5' : 'translate-x-0.5'"
              :style="{ top: '2px' }"
            >
              <!-- 小图标，根据状态显示不同图标 -->
              <svg
                v-if="isMvpMode"
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 absolute top-1 left-1 text-primary"
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
          </label>
        </div>

        <!-- 文本说明 -->
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            仅生成项目基础框架和MVP最小可行版本
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            选择此选项将指示AI仅生成核心功能的最小可行版本，适用于大型复杂项目，防止生成过多代码导致AI无法完整输出
          </p>
        </div>
      </div>

      <!-- 当选中时显示的额外信息 -->
      <div
        v-if="isMvpMode"
        class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/30 text-xs text-blue-600 dark:text-blue-400 flex items-start"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4 mr-1.5 flex-shrink-0 mt-0.5"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clip-rule="evenodd"
          />
        </svg>
        <p>
          启用MVP模式后，会在提示词中添加专门的指令让AI优先构建最小核心功能，可以大幅减少生成代码量并集中在核心架构上
        </p>
      </div>
    </div>
  </div>
</template>
