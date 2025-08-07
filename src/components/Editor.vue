<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  webcontainerInstance: {
    type: Object,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
});

const content = ref('');

watch(() => props.filePath, async (newPath) => {
  if (newPath) {
    content.value = await props.webcontainerInstance.fs.readFile(newPath, 'utf-8');
  }
});

async function onEdit(e) {
  await props.webcontainerInstance.fs.writeFile(props.filePath, e.target.value);
}
</script>

<template>
  <textarea v-model="content" @input="onEdit" style="width: 100%; height: 500px;"></textarea>
</template>
