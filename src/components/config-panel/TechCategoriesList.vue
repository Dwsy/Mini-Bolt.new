<script setup>
defineProps({
  techCategories: {
    type: Array,
    required: true,
  },
  selectedTechs: {
    type: Array,
    required: true,
  },
  getTechIconUrl: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["tech-toggled"]);

const toggleTech = (tech) => {
  emit("tech-toggled", tech);
};
</script>

<template>
  <div class="space-y-3 mb-4">
    <div
      v-for="(category, categoryIndex) in techCategories"
      :key="categoryIndex"
      class="p-3 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-100/50 dark:border-gray-700/30"
    >
      <h4
        class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between items-center"
      >
        <span>{{ category.name }}</span>
        <span
          class="text-primary/70 text-[10px]"
          v-if="category.techs.some((tech) => selectedTechs.includes(tech))"
        >
          已选:
          {{
            category.techs.filter((tech) => selectedTechs.includes(tech)).length
          }}
        </span>
      </h4>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="tech in category.techs"
          :key="tech"
          @click="toggleTech(tech)"
          class="px-1.5 py-0.5 rounded-md text-xs transition-all flex items-center"
          :class="[
            selectedTechs.includes(tech)
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm shadow-primary/20'
              : 'bg-gray-100/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600',
          ]"
        >
          <img
            :src="getTechIconUrl(tech)"
            class="w-3 h-3 mr-1"
            :alt="tech"
            onerror="this.style.display='none'"
          />
          {{ tech }}
        </button>
      </div>
    </div>
  </div>
</template>
