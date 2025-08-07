import { ref } from 'vue';

export function useWebContainerFS(webcontainerInstance) {
  const fileTree = ref([]);

  async function readdir(path, tree) {
    const entries = await webcontainerInstance.value.fs.readdir(path, { withFileTypes: true });
    for (const entry of entries) {
      const newPath = `${path}/${entry.name}`;
      if (entry.isDirectory()) {
        const dir = {
          name: entry.name,
          type: 'folder',
          path: newPath,
          children: [],
        };
        tree.push(dir);
        await readdir(newPath, dir.children);
      } else {
        tree.push({
          name: entry.name,
          type: 'file',
          path: newPath,
        });
      }
    }
  }

  async function buildFileTree() {
    if (!webcontainerInstance.value) return;
    const root = [];
    await readdir('.', root);
    fileTree.value = root;
  }

  return { fileTree, buildFileTree };
}
