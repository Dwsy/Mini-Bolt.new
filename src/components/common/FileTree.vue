<script setup>
import { useFileUtils } from "@/composables/useFileUtils";
import { provide } from "vue";
import FileTreeItem from "./FileTreeItem.vue";

const emit = defineEmits(["select-file"]);

const props = defineProps({
  fileTree: {
    type: Array,
    required: true,
  },
  rootName: {
    type: String,
    required: true,
  },
});

const { getFileIconUrl } = useFileUtils();
provide("getFileIconUrl", getFileIconUrl);

const selectFile = (filePath) => {
  emit("select-file", filePath);
};
</script>

<template>
  <div>
    <ul>
      <li class="font-medium text-primary">
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 mr-1.5 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M20 5h-8.586l-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"
            ></path>
          </svg>
          <span>{{ rootName }}</span>
        </div>

        <!-- 递归组件开始 -->
        <ul class="ml-4 mt-2">
          <file-tree-item
            v-for="item in fileTree"
            :key="item.path"
            :item="item"
            @select-file="selectFile"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>
