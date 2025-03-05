import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTemplateStore = defineStore('templates', () => {
  // State
  const templates = ref([])
  const currentTemplateId = ref(-1)
  const currentDefaultTemplateId = ref(0)
  const editingTemplate = ref({ name: '', description: '', content: '' })
  const editingTemplateIndex = ref(-1)
  
  // Template variables
  const templateVariables = ref([
    { 
      name: 'projectName', 
      type: '文本',
      description: '项目名称',
      example: 'My Amazing Project'
    },
    { 
      name: 'techStackStr', 
      type: '文本', 
      description: '所有选择的技术栈，以+号连接',
      example: 'Next.js+React+TypeScript+TailwindCSS'
    },
    { 
      name: 'requirements', 
      type: '文本', 
      description: '项目需求描述',
      example: '一个博客应用，支持文章发布和评论功能'
    },
    { 
      name: 'themeDescription', 
      type: '文本', 
      description: '主题模式描述',
      example: '暗色主题模式，使界面有高级感'
    },
    { 
      name: 'hasNextJs', 
      type: '布尔值', 
      description: '是否包含Next.js框架',
      example: 'true 或 false'
    },
    { 
      name: 'rule', 
      type: '文本', 
      description: '规则说明，根据技术栈自动生成',
      example: '1.后端代码\n2.使用mock数据\n3.为了减少代码量可以抽取公共组件,函数'
    }
  ])
  
  // Default templates
  const defaultTemplates = ref([
    {
      name: '标准模板',
      description: '默认的提示词模板，适用于大多数项目',
      content: `忽略前面的上下文
---
你是一位资深全栈工程师，使用\${techStackStr} 设计一个\${projectName}。
** 请注意不要mock直接使用实际代码编写，图片可以使用unslash **
请您模拟产品经理提出需求和信息架构，请自己构思好功能需求和界面，然后设计输出。
----
rule:
\${rule}
----
功能：\${requirements}
主题：\${themeDescription}

请按照以下格式回答输出前端工程化多文件，以便我能够自动生成相应的文件和目录结构：
* 所有内容都输出到自定义的代码块中而不是使用markdown *

## 首先，可以选择性地定义项目名称（作为顶层目录）

\`\`\`generateInfo id=generateInfo1
{
"projectName":"\${projectName}"
}
\`\`\`

## 然后，对于每个需要生成的文件，请使用以下格式：

\`\`\`{fileName:"文件名",filePath:"文件路径"}
文件内容
\`\`\`

## 格式说明

1. \`projectName\` 是可选的，如果提供，将作为顶层目录
2. \`fileName\` 是必需的，指定文件名（包括扩展名）
3. \`filePath\` 是必需的，指定文件相对路径（可以包含多级目录）
4. 文件内容直接放在花括号块的下方，直到下一个代码块开始 
5. 除此之外不要输出任何内容,项目生成信息可以放入generateInfo.md文件中
6. 编写完整的readme.md文件
7. 注意转译字符

## 示例

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
`
    },
    {
      name: '简洁模板',
      description: '简化版提示词模板，移除了一些复杂细节',
      content: `忽略前面的上下文
---
你是一位资深前端工程师，使用\${techStackStr} 设计一个\${projectName}。

请基于以下需求完成项目：
- 功能：\${requirements}
- 主题风格：\${themeDescription}
- \${hasNextJs ? '需要完整的前后端实现' : '使用前端模拟数据，不需要实现后端'}

请按照以下格式回答输出前端工程化多文件：

\`\`\`generateInfo id=generateInfo1
{
"projectName":"\${projectName}"
}
\`\`\`

\`\`\`{fileName:"文件名",filePath:"文件路径"}
文件内容
\`\`\`

确保代码结构清晰，有详细的README.md文件说明项目用法，并正确处理各组件之间的关系。
`
    }
  ])
  
  // Load templates from localStorage
  try {
    const savedTemplates = localStorage.getItem('mini-bolt-templates')
    if (savedTemplates) {
      templates.value = JSON.parse(savedTemplates)
    }
  } catch (error) {
    console.error('Failed to load templates:', error)
  }
  
  // Computed
  const getCurrentTemplate = computed(() => {
    if (currentTemplateId.value >= 0 && currentTemplateId.value < templates.value.length) {
      return templates.value[currentTemplateId.value].content
    } else if (currentDefaultTemplateId.value >= 0 && currentDefaultTemplateId.value < defaultTemplates.value.length) {
      return defaultTemplates.value[currentDefaultTemplateId.value].content
    }
    return defaultTemplates.value[0].content
  })
  
  // Actions
  function saveTemplates() {
    try {
      localStorage.setItem('mini-bolt-templates', JSON.stringify(templates.value))
      return true
    } catch (error) {
      console.error('Failed to save templates:', error)
      return false
    }
  }
  
  function initNewTemplate() {
    editingTemplateIndex.value = -1
    editingTemplate.value = {
      name: '新模板',
      description: '',
      content: defaultTemplates.value[0].content
    }
  }
  
  function editTemplate(index) {
    editingTemplateIndex.value = index
    editingTemplate.value = JSON.parse(JSON.stringify(templates.value[index]))
  }
  
  function duplicateDefaultTemplate(index) {
    editingTemplateIndex.value = -1
    editingTemplate.value = {
      name: defaultTemplates.value[index].name + ' 副本',
      description: defaultTemplates.value[index].description,
      content: defaultTemplates.value[index].content
    }
  }
  
  function saveTemplate() {
    if (!editingTemplate.value.name.trim()) {
      return { success: false, error: '模板名称不能为空' }
    }
    
    if (!editingTemplate.value.content.trim()) {
      return { success: false, error: '模板内容不能为空' }
    }
    
    if (editingTemplateIndex.value >= 0) {
      // Update existing template
      templates.value[editingTemplateIndex.value] = JSON.parse(JSON.stringify(editingTemplate.value))
    } else {
      // Add new template
      templates.value.push(JSON.parse(JSON.stringify(editingTemplate.value)))
    }
    
    if (saveTemplates()) {
      return { success: true }
    } else {
      return { success: false, error: '无法保存模板，请检查浏览器存储设置' }
    }
  }
  
  function useTemplate(index) {
    currentTemplateId.value = index
    currentDefaultTemplateId.value = -1
  }
  
  function useDefaultTemplate(index) {
    currentDefaultTemplateId.value = index
    currentTemplateId.value = -1
  }
  
  function deleteTemplate(index) {
    // If deleting current template, reset
    if (currentTemplateId.value === index) {
      currentTemplateId.value = -1
      currentDefaultTemplateId.value = 0
    } else if (currentTemplateId.value > index) {
      // If deleting a template before current, adjust index
      currentTemplateId.value--
    }
    
    templates.value.splice(index, 1)
    saveTemplates()
  }
  
  function insertVariable(variableName) {
    const textarea = document.querySelector('textarea[v-model="templateStore.editingTemplate.content"]')
    if (!textarea) return
    
    const cursorPos = textarea.selectionStart
    const textBefore = editingTemplate.value.content.substring(0, cursorPos)
    const textAfter = editingTemplate.value.content.substring(cursorPos)
    
    editingTemplate.value.content = textBefore + '${' + variableName + '}' + textAfter
    
    // Refocus and set cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = cursorPos + variableName.length + 3 // +3 for ${ and }
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 50)
  }
  
  function replaceTemplateVariables(template, variables) {
    let result = template
    
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp('\\${' + key + '}', 'g')
      result = result.replace(regex, value)
    }
    
    return result
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
    replaceTemplateVariables
  }
})