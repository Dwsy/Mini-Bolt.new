<script setup>
import { ref } from "vue";
import { useTemplateStore } from "@/stores/templates";
import { useNotificationStore } from "@/stores/notification";
import ModalWrapper from "@/components/modals/ModalWrapper.vue";

const emit = defineEmits(["close"]);

const templateStore = useTemplateStore();
const notificationStore = useNotificationStore();

// Local state
const activeTemplateTab = ref("templates");
const showVariableMenu = ref(false);
const variableMenuPosition = ref({ x: 0, y: 0 });

// Tab definitions
const templateTabs = ref([
  { id: "templates", name: "模板列表", icon: "📑" },
  { id: "variables", name: "变量说明", icon: "🔍" },
  { id: "edit", name: "编辑模板", icon: "✏️" },
]);

// Methods
const createNewTemplate = () => {
  templateStore.initNewTemplate();
  activeTemplateTab.value = "edit";
};

const editTemplate = (index) => {
  templateStore.editTemplate(index);
  activeTemplateTab.value = "edit";
};

const duplicateDefaultTemplate = (index) => {
  templateStore.duplicateDefaultTemplate(index);
  activeTemplateTab.value = "edit";
};

const saveTemplate = () => {
  const result = templateStore.saveTemplate();

  if (result.success) {
    notificationStore.show(
      "success",
      "保存成功",
      `模板 "${templateStore.editingTemplate.name}" 已保存`
    );
    activeTemplateTab.value = "templates";
  } else {
    notificationStore.show("error", "保存失败", result.error || "无法保存模板");
  }
};

const cancelTemplateEdit = () => {
  activeTemplateTab.value = "templates";
};

const useTemplate = (index) => {
  templateStore.useTemplate(index);
  notificationStore.show(
    "success",
    "已选择模板",
    `当前使用模板: "${templateStore.templates[index].name}"`
  );
  emit("close");
};

const useDefaultTemplate = (index) => {
  templateStore.useDefaultTemplate(index);
  notificationStore.show(
    "success",
    "已选择模板",
    `当前使用模板: "${templateStore.defaultTemplates[index].name}"`
  );
  emit("close");
};

const deleteTemplate = (index) => {
  if (confirm(`确定要删除模板 "${templateStore.templates[index].name}" 吗？`)) {
    templateStore.deleteTemplate(index);
    notificationStore.show("success", "删除成功", "模板已删除");
  }
};

const insertVariable = (event) => {
  const rect = event.target.getBoundingClientRect();
  variableMenuPosition.value = {
    x: rect.left,
    y: rect.bottom + 5,
  };
  showVariableMenu.value = true;

  // 点击其他位置关闭菜单
  setTimeout(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".variable-menu")) {
        showVariableMenu.value = false;
        document.removeEventListener("click", closeMenu);
      }
    };
    document.addEventListener("click", closeMenu);
  }, 100);
};

const insertVariableToTemplate = (variableName) => {
  templateStore.insertVariable(variableName);
  showVariableMenu.value = false;
};
</script>

<template>
  <ModalWrapper title="模板管理" @close="emit('close')">
    <div class="p-5 max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar">
      <div class="flex mb-6 border-b border-base-300/30 pb-2 overflow-x-auto">
        <button
          v-for="tab in templateTabs"
          :key="tab.id"
          @click="activeTemplateTab = tab.id"
          :class="[
            'px-5 py-3 text-sm font-medium rounded-t-lg mr-3 -mb-px transition-all duration-200 flex items-center whitespace-nowrap',
            activeTemplateTab === tab.id
              ? 'bg-gradient-to-r from-primary/20 to-primary/5 text-primary border-t border-l border-r border-primary/30 shadow-sm backdrop-blur-sm'
              : 'text-base-content/60 hover:text-base-content hover:bg-base-200/60 hover:backdrop-blur-sm',
          ]"
        >
          <span class="mr-2">{{ tab.icon }}</span>
          {{ tab.name }}
        </button>
      </div>

      <!-- 模板列表 -->
      <div v-if="activeTemplateTab === 'templates'" class="space-y-6">
        <div class="flex justify-between mb-5 items-center">
          <h4 class="text-xl font-bold text-base-content flex items-center">
            <span
              class="bg-primary/20 text-primary rounded-full p-1.5 mr-2 backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            我的模板
          </h4>
          <button
            @click="createNewTemplate"
            class="btn btn-primary btn-md shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            新建模板
          </button>
        </div>

        <div
          v-if="templateStore.templates.length === 0"
          class="text-center py-12 text-base-content/50 glass-effect rounded-xl border border-base-300/30 shadow-inner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 mx-auto mb-4 opacity-30 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p class="text-lg">
            还没有保存的模板，您可以创建一个新模板或使用默认模板
          </p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(template, index) in templateStore.templates"
            :key="index"
            class="glass-effect border border-base-300/30 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-primary/30"
          >
            <div class="flex justify-between items-center">
              <h5 class="font-bold text-primary text-lg">
                {{ template.name }}
              </h5>
              <div class="flex space-x-3">
                <button
                  @click="editTemplate(index)"
                  class="btn btn-sm btn-ghost hover:bg-primary/10 hover:text-primary transition-colors"
                  title="编辑"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  @click="useTemplate(index)"
                  class="btn btn-sm btn-primary shadow-sm hover:shadow-md"
                  title="使用"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  @click="deleteTemplate(index)"
                  class="btn btn-sm btn-ghost hover:bg-error/10 hover:text-error transition-colors"
                  title="删除"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p
              class="text-sm text-base-content/70 mt-2 line-clamp-2 bg-base-100/50 p-2 rounded-md"
            >
              {{ template.description || "无描述" }}
            </p>
          </div>
        </div>

        <div class="border-t border-base-300/30 pt-6 mt-6">
          <h4
            class="text-xl font-bold text-base-content mb-5 flex items-center"
          >
            <span
              class="bg-secondary/20 text-secondary rounded-full p-1.5 mr-2 backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            系统默认模板
          </h4>
          <div class="space-y-4">
            <div
              v-for="(template, index) in templateStore.defaultTemplates"
              :key="index"
              class="glass-effect border border-base-300/30 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-secondary/30"
            >
              <div class="flex justify-between items-center">
                <h5 class="font-bold text-secondary text-lg">
                  {{ template.name }}
                </h5>
                <div class="flex space-x-3">
                  <button
                    @click="duplicateDefaultTemplate(index)"
                    class="btn btn-sm btn-ghost hover:bg-secondary/10 hover:text-secondary transition-colors"
                    title="复制"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                      />
                    </svg>
                  </button>
                  <button
                    @click="useDefaultTemplate(index)"
                    class="btn btn-sm btn-secondary shadow-sm hover:shadow-md"
                    title="使用"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <p
                class="text-sm text-base-content/70 mt-2 line-clamp-2 bg-base-100/50 p-2 rounded-md"
              >
                {{ template.description || "无描述" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 变量说明 -->
      <div v-else-if="activeTemplateTab === 'variables'" class="space-y-5">
        <div
          class="glass-effect bg-primary/10 rounded-lg p-4 border border-primary/20 shadow-sm"
        >
          <p class="text-base-content">
            提示词模板中可以使用以下变量，它们将在生成提示词时被替换为相应的值：
          </p>
        </div>

        <div
          class="glass-effect rounded-lg p-5 shadow-sm space-y-5 border border-base-300/30"
        >
          <div
            v-for="(variable, index) in templateStore.templateVariables"
            :key="index"
            class="border-b border-base-200/30 pb-4 last:border-0 last:pb-0 hover:bg-base-200/30 p-3 rounded-md transition-colors"
          >
            <div class="flex items-center mb-2">
              <code
                class="bg-base-100 px-3 py-1 rounded-md text-primary font-mono shadow-sm"
                >{{ variable.name }}</code
              >
              <span
                class="ml-3 px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-semibold"
                >{{ variable.type }}</span
              >
            </div>
            <p class="text-base text-base-content">
              {{ variable.description }}
            </p>
            <div class="mt-2 text-xs text-base-content/70 flex items-center">
              <span class="mr-2 font-medium">示例值:</span>
              <code
                class="bg-base-100 px-2 py-1 rounded-md text-base-content/80 font-mono text-xs shadow-sm"
                >{{ variable.example }}</code
              >
            </div>
          </div>
        </div>
      </div>

      <!-- 编辑模板 -->
      <div v-else-if="activeTemplateTab === 'edit'" class="space-y-6">
        <div class="space-y-3">
          <label
            class="block text-base font-medium text-base-content flex items-center"
            ><span
              class="bg-primary/20 text-primary p-1.5 rounded-md mr-2 backdrop-blur-sm"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                /></svg></span
            >模板名称</label
          >
          <input
            v-model="templateStore.editingTemplate.name"
            type="text"
            class="input glass-effect w-full shadow-sm focus:shadow-md transition-shadow focus:border-primary"
            placeholder="输入模板名称"
          />
        </div>

        <div class="space-y-3">
          <label
            class="block text-base font-medium text-base-content flex items-center"
            ><span
              class="bg-primary/20 text-primary p-1.5 rounded-md mr-2 backdrop-blur-sm"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg></span
            >模板描述</label
          >
          <input
            v-model="templateStore.editingTemplate.description"
            type="text"
            class="input glass-effect w-full shadow-sm focus:shadow-md transition-shadow focus:border-primary"
            placeholder="简短描述这个模板的用途"
          />
        </div>

        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <label
              class="block text-base font-medium text-base-content flex items-center"
              ><span
                class="bg-primary/20 text-primary p-1.5 rounded-md mr-2 backdrop-blur-sm"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  /></svg></span
              >模板内容</label
            >
            <div class="flex items-center text-xs text-base-content/70">
              <button
                @click="insertVariable"
                class="btn btn-sm btn-primary btn-outline shadow-sm hover:shadow-md transition-shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                插入变量
              </button>
            </div>
          </div>
          <textarea
            v-model="templateStore.editingTemplate.content"
            rows="12"
            class="textarea glass-effect w-full font-mono text-sm custom-scrollbar shadow-sm focus:shadow-md transition-shadow focus:border-primary"
            placeholder="在此输入提示词模板内容..."
          ></textarea>

          <div
            class="glass-effect p-4 rounded-lg text-sm text-base-content/80 shadow-sm border border-base-300/30"
          >
            <div class="flex items-center mb-2 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 100-2H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-bold">提示</span>
            </div>
            <p>
              使用
              <code class="bg-base-100 px-2 py-0.5 rounded-md shadow-sm"
                >${变量名}</code
              >
              格式插入变量，例如
              <code class="bg-base-100 px-2 py-0.5 rounded-md shadow-sm"
                >${projectName}</code
              >。
            </p>
            <p class="mt-2">点击"插入变量"按钮快速添加可用变量。</p>
          </div>
        </div>

        <div class="flex justify-end space-x-4 pt-3">
          <button
            @click="cancelTemplateEdit"
            class="btn btn-ghost hover:bg-base-300/50 transition-colors backdrop-blur-sm"
          >
            取消
          </button>
          <button
            @click="saveTemplate"
            class="btn btn-primary shadow-lg hover:shadow-xl transition-shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            保存模板
          </button>
        </div>
      </div>
    </div>

    <!-- 变量插入菜单 -->
    <div
      v-if="showVariableMenu"
      :style="`position: fixed; top: ${variableMenuPosition.y}px; left: ${variableMenuPosition.x}px;`"
      class="variable-menu glass-effect rounded-lg border border-base-300/50 shadow-xl z-50 w-72 overflow-hidden"
    >
      <div
        class="p-3 text-sm font-medium bg-gradient-to-r from-primary/30 to-primary/10 text-primary border-b border-base-300/50 backdrop-blur-sm"
      >
        选择要插入的变量
      </div>
      <div class="max-h-80 overflow-y-auto custom-scrollbar">
        <button
          v-for="variable in templateStore.templateVariables"
          :key="variable.name"
          @click="insertVariableToTemplate(variable.name)"
          class="w-full text-left px-4 py-3 hover:bg-base-200 flex items-center text-sm border-b border-base-200/50 last:border-0 transition-colors"
        >
          <code
            class="bg-primary/10 px-2 py-1 rounded-md text-primary font-mono text-xs mr-3 min-w-[80px] text-center"
            >${{ variable.name }}</code
          >
          <span class="text-base-content truncate">{{
            variable.description
          }}</span>
        </button>
      </div>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.05)
  );
}

.dark .glass-effect {
  background: rgba(15, 23, 42, 0.4);
  background-image: linear-gradient(
    to bottom right,
    rgba(30, 41, 59, 0.5),
    rgba(15, 23, 42, 0.2)
  );
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--p), 0.3) rgba(var(--b2), 0.1);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(var(--b2), 0.1);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(var(--p), 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--p), 0.5);
}
</style>
