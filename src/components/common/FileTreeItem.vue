<script setup>
import { inject } from "vue";
import FileTreeItem from "./FileTreeItem.vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["select-file"]);
const getFileIconUrl = inject("getFileIconUrl");

const handleSelectFile = (filePath) => {
  emit("select-file", filePath);
};
</script>

<template>
  <li class="mb-1">
    <div
      class="flex items-center cursor-pointer"
      @click="item.type === 'file' ? handleSelectFile(item.filePath) : null"
    >
      <svg
        v-if="item.type === 'folder'"
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 mr-1.5 text-primary"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M20 5h-8.586l-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"
        ></path>
      </svg>
      <img
        v-else-if="getFileIconUrl(item.name)"
        :src="getFileIconUrl(item.name)"
        :alt="item.name"
        class="w-4 h-4 mr-1.5"
      />
      <img
        v-else
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
        alt="文件"
        class="w-4 h-4 mr-1.5"
      />
      <span
        :class="{
          'text-primary hover:underline': item.type === 'file',
        }"
      >
        {{ item.name }}
      </span>
    </div>

    <!-- 递归渲染子项目 -->
    <ul v-if="item.children && item.children.length" class="ml-5 mt-1">
      <FileTreeItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        @select-file="handleSelectFile"
      />
    </ul>
  </li>
</template>
