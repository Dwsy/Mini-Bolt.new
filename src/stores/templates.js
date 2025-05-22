import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTemplateStore = defineStore("templates", () => {
  // State
  const templates = ref([]);
  const currentTemplateId = ref(-1);
  const currentDefaultTemplateId = ref(0);
  const editingTemplate = ref({ name: "", description: "", content: "" });
  const editingTemplateIndex = ref(-1);

  // Template variables
  const templateVariables = ref([
    {
      name: "projectName",
      type: "文本",
      description: "项目名称",
      example: "My Amazing Project",
    },
    {
      name: "techStackStr",
      type: "文本",
      description: "所有选择的技术栈，以+号连接",
      example: "Next.js+React+TypeScript+TailwindCSS",
    },
    {
      name: "requirements",
      type: "文本",
      description: "项目需求描述",
      example: "一个博客应用，支持文章发布和评论功能",
    },
    {
      name: "themeDescription",
      type: "文本",
      description: "项目UI主题描述",
      example: "暗色主题模式，使界面有高级感",
    },
    {
      name: "designStyle",
      type: "文本",
      description: "设计风格名称",
      example: "玻璃态设计",
    },
    {
      name: "designDescription",
      type: "文本",
      description: "设计风格的详细描述",
      example: "透明磨砂效果，现代感强，适合展示层次感的界面",
    },
    {
      name: "hasNextJs",
      type: "布尔值",
      description: "是否包含Next.js框架",
      example: "true 或 false",
    },
    {
      name: "rule",
      type: "文本",
      description: "规则说明，根据技术栈自动生成",
      example:
        "1.后端代码\n2.使用mock数据\n3.为了减少代码量可以抽取公共组件,函数",
    },
    {
      name: "customSections",
      type: "文本",
      description: "用户自定义的提示词部分或规则",
      example: "例如：请确保所有组件都有单元测试。\\n代码风格遵循Airbnb。",
    },
  ]);

  // Default templates
  const defaultTemplates = ref([
    {
      name: "标准模板",
      description: "默认的提示词模板，适用于大多数项目",
      content: `忽略前面的上下文
---
你是一位资深全栈工程师，将使用 \${techStackStr} 技术栈来设计和实现一个名为 “\${projectName}” 的项目。
**请注意：请直接编写实际代码，不要使用mock数据。图片服务请使用 Unsplash (https://unsplash.com) 提供的图片。**
你需要模拟产品经理的角色，首先进行需求分析和信息架构设计，然后构思具体的功能模块和用户界面，最后输出完整的设计和代码。
----
项目规则 (请严格遵守):
\${rule}
\${customSections}
----
核心功能需求：\${requirements}
项目主题风格：\${themeDescription}
设计风格参考：\${designStyle} - \${designDescription}

请按照以下格式输出一个包含多个文件的工程化项目，以便我能够自动解析并生成相应的文件和目录结构：
* 重要：所有指定输出的内容（项目名称定义、文件代码）都必须严格包含在下述的自定义代码块中，不要在代码块之外添加任何Markdown格式或其他描述性文字。*

## 第一步：定义项目名称（作为顶层目录，可选）

\`\`\`generateInfo id=generateInfo1
{
"projectName":"\${projectName}"
}
\`\`\`

## 第二步：输出每个文件的内容

对于项目中需要生成的每一个文件，请使用以下格式进行输出。一个文件一个代码块，确保包含完整的文件路径和文件名。

\`\`\`{fileName:"文件名",filePath:"文件路径"}
文件内容
\`\`\`

## 输出格式详细说明

1.  **项目名称定义 (generateInfo)**:
    *   使用 \`generateInfo\` 代码块定义项目名称。
    *   \`projectName\` 字段的值即为项目的根目录名。这是可选的。
2.  **文件内容定义 ({fileName, filePath})**:
    *   每个文件都必须使用独立的 \`\`\`{fileName:"...",filePath:"..."}\`\`\` 代码块包裹。
    *   \`fileName\`: 字符串类型，必需，指定文件名，包含正确的扩展名 (例如："index.html", "App.vue", "styles.css")。
    *   \`filePath\`: 字符串类型，必需，指定文件相对于项目根目录的路径 (例如："src/components", "public", ".")。使用"."表示文件位于根目录。
    *   代码块内部即为该文件的完整内容。
3.  **通用规则**:
    *   严格遵循上述代码块格式，不要在代码块的起始和结束标记前后添加任何额外字符。
    *   确保文件内容中的特殊字符 (例如 \` \` \` , \`{\`, \`}\`) 根据需要进行转义，以避免解析错误。
    *   务必为项目编写一个内容详尽的 \`README.md\` 文件，放在项目根目录下，清晰说明项目的设置、启动步骤和各项功能。
    *   除了 \`generateInfo\` 和文件代码块之外，不要输出任何其他内容。

## 示例输出

以下是一个符合要求的回答示例：

\`\`\`generateInfo id=generateInfo0
{
"projectName":"my_project"
}
\`\`\`

\`\`\`{fileName:"app.py",filePath:"src/app.py"}
print("这是主应用文件")
\`\`\`

\`\`\`{fileName:"config.json",filePath:"config/config.json"}
{
  "name": "我的项目",
  "version": "1.0.0"
}
\`\`\`
`,
    },
    {
      name: "简洁模板",
      description: "简化版提示词模板，移除了一些复杂细节",
      content: `忽略前面的上下文
---
你是一位经验丰富的前端工程师，将使用 \${techStackStr} 技术栈为我构建一个名为 “\${projectName}” 的项目。

**项目核心需求如下：**
- 主要功能：\${requirements}
- 视觉主题：\${themeDescription}
- 设计风格：\${designStyle} (\${designDescription})
- 后端处理：\${hasNextJs ? '需要对接真实后端接口（请你一并实现简单的后端部分）' : '使用前端模拟数据或mock API，无需实现后端逻辑'}
\${customSections}

**输出要求：**
请严格按照以下指定的格式输出一个包含多个文件的工程化项目。这将帮助我自动解析并生成对应的文件和目录结构。

## 1. 定义项目名称 (可选)
如果需要将所有文件组织在一个顶层项目目录中，请使用此代码块：
\`\`\`generateInfo id=generateInfo1
{
"projectName":"\${projectName}"
}
\`\`\`

## 2. 输出各文件的具体内容
针对项目中的每一个文件，请使用如下格式独立包裹其内容：
\`\`\`{fileName:"文件名.扩展名",filePath:"相对路径"}
文件的完整代码内容...
\`\`\`

**重要提示：**
- 请确保 \`fileName\` 包含正确的文件扩展名，\`filePath\` 为相对于项目根目录的路径。
- 编写一个清晰、详尽的 \`README.md\` 文件，说明如何配置、启动项目以及各项功能的使用方法。
- 除了上述指定的代码块格式外，请不要添加任何额外的解释性文本或Markdown标记。
- 注意代码中特殊字符的转义，以确保解析正确。
`,
    },
  ]);

  // Load templates from localStorage
  try {
    const savedTemplates = localStorage.getItem("mini-bolt-templates");
    if (savedTemplates) {
      templates.value = JSON.parse(savedTemplates);
    }
  } catch (error) {
    console.error("Failed to load templates:", error);
  }

  // Computed
  const getCurrentTemplate = computed(() => {
    if (
      currentTemplateId.value >= 0 &&
      currentTemplateId.value < templates.value.length
    ) {
      return templates.value[currentTemplateId.value].content;
    } else if (
      currentDefaultTemplateId.value >= 0 &&
      currentDefaultTemplateId.value < defaultTemplates.value.length
    ) {
      return defaultTemplates.value[currentDefaultTemplateId.value].content;
    }
    return defaultTemplates.value[0].content;
  });

  // Actions
  function saveTemplates() {
    try {
      localStorage.setItem(
        "mini-bolt-templates",
        JSON.stringify(templates.value)
      );
      return true;
    } catch (error) {
      console.error("Failed to save templates:", error);
      return false;
    }
  }

  function initNewTemplate() {
    editingTemplateIndex.value = -1;
    editingTemplate.value = {
      name: "新模板",
      description: "",
      content: defaultTemplates.value[0].content,
    };
  }

  function editTemplate(index) {
    editingTemplateIndex.value = index;
    editingTemplate.value = JSON.parse(JSON.stringify(templates.value[index]));
  }

  function duplicateDefaultTemplate(index) {
    editingTemplateIndex.value = -1;
    editingTemplate.value = {
      name: defaultTemplates.value[index].name + " 副本",
      description: defaultTemplates.value[index].description,
      content: defaultTemplates.value[index].content,
    };
  }

  function saveTemplate() {
    if (!editingTemplate.value.name.trim()) {
      return { success: false, error: "模板名称不能为空" };
    }

    if (!editingTemplate.value.content.trim()) {
      return { success: false, error: "模板内容不能为空" };
    }

    if (editingTemplateIndex.value >= 0) {
      // Update existing template
      templates.value[editingTemplateIndex.value] = JSON.parse(
        JSON.stringify(editingTemplate.value)
      );
    } else {
      // Add new template
      templates.value.push(JSON.parse(JSON.stringify(editingTemplate.value)));
    }

    if (saveTemplates()) {
      return { success: true };
    } else {
      return { success: false, error: "无法保存模板，请检查浏览器存储设置" };
    }
  }

  function useTemplate(index) {
    currentTemplateId.value = index;
    currentDefaultTemplateId.value = -1;
  }

  function useDefaultTemplate(index) {
    currentDefaultTemplateId.value = index;
    currentTemplateId.value = -1;
  }

  function deleteTemplate(index) {
    // If deleting current template, reset
    if (currentTemplateId.value === index) {
      currentTemplateId.value = -1;
      currentDefaultTemplateId.value = 0;
    } else if (currentTemplateId.value > index) {
      // If deleting a template before current, adjust index
      currentTemplateId.value--;
    }

    templates.value.splice(index, 1);
    saveTemplates();
  }

  function insertVariable(variableName) {
    const textarea = document.querySelector(
      'textarea[v-model="templateStore.editingTemplate.content"]'
    );
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBefore = editingTemplate.value.content.substring(0, cursorPos);
    const textAfter = editingTemplate.value.content.substring(cursorPos);

    editingTemplate.value.content =
      textBefore + "${" + variableName + "}" + textAfter;

    // Refocus and set cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = cursorPos + variableName.length + 3; // +3 for ${ and }
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);
  }

  function replaceTemplateVariables(template, variables) {
    if (!template) return "";

    let result = template;

    // 替换基本变量
    if (variables.projectName) {
      result = result.replace(/\${projectName}/g, variables.projectName);
    }

    if (variables.techStackStr) {
      result = result.replace(/\${techStackStr}/g, variables.techStackStr);
    }

    if (variables.requirements) {
      result = result.replace(
        /\${requirements}/g,
        variables.requirements || ""
      );
    }

    if (variables.themeDescription) {
      result = result.replace(
        /\${themeDescription}/g,
        variables.themeDescription || ""
      );
    }

    if (variables.designStyle) {
      result = result.replace(/\${designStyle}/g, variables.designStyle || "");
    }

    if (variables.designDescription) {
      result = result.replace(
        /\${designDescription}/g,
        variables.designDescription || ""
      );
    }

    if (variables.hasNextJs !== undefined) {
      const nextJsSection = variables.hasNextJs
        ? "使用Next.js的App Router和React Server Components"
        : "";
      result = result.replace(/\${nextJsSection}/g, nextJsSection);
    }

    if (variables.rule) {
      result = result.replace(/\${rule}/g, variables.rule);
    }

    if (variables.customSections) {
      result = result.replace(/\${customSections}/g, variables.customSections);
    }

    return result;
  }

  return {
    templates,
    defaultTemplates,
    currentTemplateId,
    currentDefaultTemplateId,
    editingTemplate,
    editingTemplateIndex,
    templateVariables,
    getCurrentTemplate,
    saveTemplates,
    initNewTemplate,
    editTemplate,
    duplicateDefaultTemplate,
    saveTemplate,
    useTemplate,
    useDefaultTemplate,
    deleteTemplate,
    insertVariable,
    replaceTemplateVariables,
  };
});
