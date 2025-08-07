import { ref } from 'vue';
import { WebContainer } from '@webcontainer/api';
import { files } from '@/utils/files';

export function useWebContainer() {
  const status = ref('idle');
  const url = ref('');
  const webcontainerInstance = ref(null);

  async function boot() {
    status.value = 'booting';
    webcontainerInstance.value = await WebContainer.boot();

    status.value = 'mounting';
    await webcontainerInstance.value.mount(files);

    status.value = 'installing';
    const installProcess = await webcontainerInstance.value.spawn('pnpm', ['install']);
    await installProcess.exit;

    status.value = 'starting';
    await webcontainerInstance.value.spawn('pnpm', ['run', 'dev']);

    webcontainerInstance.value.on('server-ready', (port, newUrl) => {
      status.value = 'ready';
      url.value = newUrl;
    });
  }

  return { status, url, boot, webcontainerInstance };
}
