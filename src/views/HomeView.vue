<script setup>
import { ref } from 'vue';
import WebContainer from '@/components/WebContainer.vue';
import FileTree from '@/components/common/FileTree.vue';
import Editor from '@/components/Editor.vue';
import { useWebContainer } from '@/composables/useWebContainer';

const { status, url, boot, webcontainerInstance } = useWebContainer();
const selectedFile = ref('');

function onSelectFile(path) {
  selectedFile.value = path;
}
</script>

<template>
  <div>
    <button @click="boot" :disabled="status !== 'idle'">Boot WebContainer</button>
    <p>Status: {{ status }}</p>
    <div style="display: flex;">
      <div style="width: 30%;">
        <FileTree v-if="webcontainerInstance" :webcontainerInstance="webcontainerInstance" @select-file="onSelectFile" />
      </div>
      <div style="width: 70%;">
        <Editor v-if="selectedFile" :webcontainerInstance="webcontainerInstance" :filePath="selectedFile" />
      </div>
    </div>
    <iframe v-if="url" :src="url" width="800" height="600"></iframe>
  </div>
</template>
