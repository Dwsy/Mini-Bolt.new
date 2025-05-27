<script setup>
import { ref, computed } from 'vue';
import { usePromptStore } from '@/stores/prompt';

const promptStore = usePromptStore();

import { ref, computed, watch } from 'vue'; // Added watch
import { usePromptStore } from '@/stores/prompt';

const promptStore = usePromptStore();

const designPrompts = ref(promptStore.getDesignPrompts());
const searchQuery = ref('');
const selectedTags = ref(new Set()); // Using a Set for unique selected tags

// Selected style name for visual feedback and syncing with store
const selectedStyleName = ref(promptStore.projectInfo.selectedDesignPromptName || '');

// Watch for changes in the store's selectedDesignPromptName to reflect external updates
watch(() => promptStore.projectInfo.selectedDesignPromptName, (newName) => {
  selectedStyleName.value = newName || '';
});


// Filter styles based on search query and selected tags
const filteredStyles = computed(() => {
  let styles = designPrompts.value;

  // Filter by search query (name or description)
  if (searchQuery.value.trim()) {
    const lowerSearchQuery = searchQuery.value.toLowerCase();
    styles = styles.filter(style => {
      const nameMatch = style.name.toLowerCase().includes(lowerSearchQuery);
      const descriptionMatch = style.description.toLowerCase().includes(lowerSearchQuery);
      return nameMatch || descriptionMatch;
    });
  }

  // Filter by selected tags (must contain ALL selected tags)
  if (selectedTags.value.size > 0) {
    styles = styles.filter(style => {
      return Array.from(selectedTags.value).every(tag => style.tags.includes(tag));
    });
  }
  return styles;
});

// Get all unique tags from the design prompts
const uniqueTags = computed(() => {
  const allTags = new Set();
  designPrompts.value.forEach(style => {
    style.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
});

// Toggle tag selection
function toggleTag(tag) {
  if (selectedTags.value.has(tag)) {
    selectedTags.value.delete(tag);
  } else {
    selectedTags.value.add(tag);
  }
}

// Select or deselect a style
function selectStyle(style) {
  if (selectedStyleName.value === style.name) {
    // Deselect style
    selectedStyleName.value = '';
    promptStore.projectInfo.designStyle = '';
    promptStore.projectInfo.designDescription = '';
    promptStore.projectInfo.selectedDesignPromptName = '';
  } else {
    // Select style
    selectedStyleName.value = style.name;
    promptStore.projectInfo.designStyle = style.name;
    // Assuming designDescription should store the style's description
    promptStore.projectInfo.designDescription = style.description; 
    promptStore.projectInfo.selectedDesignPromptName = style.name;
  }
}

// Clear all filters and selections
function clearFiltersAndSelection() {
  searchQuery.value = '';
  selectedTags.value.clear();
  // Optionally, also deselect the style if you want "clear" to do everything
  // if (selectedStyleName.value) {
  //   selectedStyleName.value = '';
  //   promptStore.projectInfo.designStyle = '';
  //   promptStore.projectInfo.designDescription = '';
  //   promptStore.projectInfo.selectedDesignPromptName = '';
  // }
}

</script>

<template>
  <div class="space-y-6 p-4 bg-base-200 rounded-lg shadow">
    <h3 class="text-xl font-semibold text-primary">选择或搜索设计风格</h3>

    <!-- Search and Clear Controls -->
    <div class="flex flex-col sm:flex-row gap-2 items-center">
    <div class="form-control">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="搜索风格名称或描述..."
        class="input input-bordered w-full sm:flex-grow shadow-sm focus:ring-primary focus:border-primary"
      />
      <button 
        @click="clearFiltersAndSelection" 
        class="btn btn-ghost text-sm"
        title="清空搜索和已选标签"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0L12 14.25m2.25-2.25L14.25 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        清空筛选
      </button>
    </div>

    <!-- Tags Display & Filtering -->
    <div class="space-y-2">
      <h4 class="text-md font-medium text-base-content/80">按标签筛选 (AND 逻辑)</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in uniqueTags"
          :key="tag"
          class="btn btn-xs"
          :class="{
            'btn-primary text-white': selectedTags.has(tag),
            'btn-outline': !selectedTags.has(tag)
          }"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- Styles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[300px]">
      <div
        v-for="style in filteredStyles"
        :key="style.name"
        class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
        :class="{ 
          'ring-2 ring-primary ring-offset-2 dark:ring-offset-base-200': selectedStyleName === style.name,
          'border border-transparent': selectedStyleName !== style.name
        }"
        @click="selectStyle(style)"
      >
        <div class="card-body p-5">
          <h4 class="card-title text-md font-semibold text-primary truncate" :title="style.name">
            {{ style.name }}
          </h4>
          <p class="text-xs text-base-content/70 h-16 overflow-hidden" :title="style.description">
            {{ style.description }}
          </p>
          <div class="card-actions justify-start mt-2 flex-wrap min-h-[20px]">
            <span
              v-for="tag in style.tags.slice(0, 3)"
              :key="tag"
              class="badge badge-ghost badge-sm text-xs"
            >
              {{ tag }}
            </span>
            <span v-if="style.tags.length > 3" class="badge badge-outline badge-sm text-xs">
              +{{ style.tags.length - 3 }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filteredStyles.length === 0 && designPrompts.length > 0" class="text-center py-10 text-base-content/60">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto mb-2 text-gray-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
      <p>没有找到匹配当前筛选条件的设计风格。</p>
      <p class="text-sm mt-1">请尝试调整搜索词或清除部分标签筛选。</p>
    </div>
     <div v-if="designPrompts.length === 0" class="text-center py-10 text-base-content/60">
      <p>暂无设计风格数据。</p>
    </div>
  </div>
</template>

<style scoped>
.h-16 { /* For description truncation */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4; /* Adjust for better spacing with 3 lines */
  max-height: calc(1.4 * 3 * 1em); /* Fallback for browsers not supporting -webkit-line-clamp */
}

.min-h-\[20px\] { /* Ensure tag area has some height even if empty */
  min-height: 20px;
}

.min-h-\[300px\] { /* Ensure grid area has some height when empty */
    min-height: 300px;
}
</style>
