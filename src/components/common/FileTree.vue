<script setup>
import { watch, onMounted } from "vue";
import FileTreeItem from "./FileTreeItem.vue";
import { useWebContainerFS } from "@/composables/useWebContainerFS.js";

const emit = defineEmits(["select-file"]);

const props = defineProps({
  webcontainerInstance: {
    type: Object,
    required: true,
  },
});

const { fileTree, buildFileTree } = useWebContainerFS(props.webcontainerInstance);

watch(() => props.webcontainerInstance, (newInstance) => {
  if (newInstance) {
    buildFileTree();
  }
});

onMounted(() => {
  buildFileTree();
});


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
          <span>project</span>
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
