import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useNotificationStore } from './notification'
import JSZip from 'jszip'

export const useFileStore = defineStore('files', () => {
  // State
  const parseInput = ref('')
  const parsedFiles = ref([])
  const selectedFile = ref(null)
  const projectInfo = ref({ projectName: '' })
  const parseHistory = ref([])
  
  // Load parse history from localStorage
  try {
    const savedHistory = localStorage.getItem('mini-bolt-parse-history')
    if (savedHistory) {
      parseHistory.value = JSON.parse(savedHistory)
    }
  } catch (error) {
    console.error('Failed to load parse history:', error)
  }
  
  // Computed
  const fileTree = computed(() => {
    const tree = []
    const pathMap = new Map()
    
    parsedFiles.value.forEach(file => {
      const parts = file.filePath.split('/')
      const fileName = parts.pop() // File name is the last part
      
      // For each path level, ensure there's a corresponding node in the tree
      let currentPath = ''
      let currentLevel = tree
      
      parts.forEach(part => {
        currentPath = currentPath ? `${currentPath}/${part}` : part
        
        // Check if this path already exists in the tree
        let node = pathMap.get(currentPath)
        
        if (!node) {
          // If not, create a new node
          node = {
            name: part,
            path: currentPath,
            type: 'folder',
            children: []
          }
          
          // Add node to current level
          currentLevel.push(node)
          
          // Add node to pathMap for quick lookup
          pathMap.set(currentPath, node)
        }
        
        // Update current level to this node's children
        currentLevel = node.children
      })
      
      // File node
      currentLevel.push({
        name: fileName,
        path: file.filePath,
        type: 'file',
        filePath: file.filePath
      })
    })
    
    return tree
  })
  
  // Actions
  async function parseCode(input) {
    try {
      // Store input
      parseInput.value = input
      
      // Reset state
      parsedFiles.value = []
      selectedFile.value = null
      
      // Parse project info
      const generateInfoRegex = /```generateInfo[^`]*\n({[\s\S]*?})\n```/g
      const generateInfoMatch = generateInfoRegex.exec(input)
      
      if (generateInfoMatch && generateInfoMatch[1]) {
        try {
          projectInfo.value = JSON.parse(generateInfoMatch[1])
        } catch (e) {
          console.error('Failed to parse project info:', e)
          projectInfo.value = { projectName: 'Untitled Project' }
        }
      } else {
        projectInfo.value = { projectName: 'Untitled Project' }
      }
      
      // Parse files
      const fileRegex = /```\{fileName:"([^"]+)",filePath:"([^"]+)"\}([\s\S]*?)(?=```\{|$)/g
      let match
      
      while ((match = fileRegex.exec(input)) !== null) {
        const fileName = match[1]
        const filePath = match[2]
        
        // Remove trailing ``` if present
        let content = match[3].trim()
        if (content.endsWith('```')) {
          content = content.substring(0, content.length - 3).trim()
        }
        
        parsedFiles.value.push({
          fileName,
          filePath,
          content
        })
      }
      
      if (parsedFiles.value.length === 0) {
        return { 
          success: false, 
          error: '未找到符合格式的文件代码块。请确保代码按照指定格式生成。' 
        }
      }
      
      // Save to parse history
      addToParseHistory(projectInfo.value.projectName, parsedFiles.value, input)
      
      return { success: true }
    } catch (error) {
      console.error('Parse error:', error)
      return { success: false, error: `解析出错: ${error.message}` }
    }
  }
  
  function selectFile(filePath) {
    const file = parsedFiles.value.find(f => f.filePath === filePath)
    if (file) {
      selectedFile.value = file
    }
  }
  
  async function downloadFiles() {
    if (parsedFiles.value.length === 0) {
      return { success: false, error: 'No files to download' }
    }
    
    try {
      const zip = new JSZip()
      const rootFolderName = projectInfo.value.projectName || 'project'
      
      // Add files to zip
      parsedFiles.value.forEach(file => {
        zip.file(`${rootFolderName}/${file.filePath}`, file.content)
      })
      
      // Generate zip and download
      const content = await zip.generateAsync({ type: 'blob' })
      
      // Create download link
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = `${rootFolderName}.zip`
      
      // Trigger download
      document.body.appendChild(a)
      a.click()
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 100)
      
      return { success: true, fileName: `${rootFolderName}.zip` }
    } catch (error) {
      console.error('Download error:', error)
      return { success: false, error: error.message }
    }
  }
  
  function addToParseHistory(projectName, files, parseInputText) {
    parseHistory.value.unshift({
      projectName: projectName || 'Untitled Project',
      files: JSON.parse(JSON.stringify(files)), // Deep copy
      parseInput: parseInputText,
      timestamp: Date.now()
    })
    
    // Limit history size to 20 items
    if (parseHistory.value.length > 20) {
      parseHistory.value = parseHistory.value.slice(0, 20)
    }
    
    // Save to localStorage
    try {
      localStorage.setItem('mini-bolt-parse-history', JSON.stringify(parseHistory.value))
    } catch (error) {
      console.error('Failed to save parse history:', error)
    }
  }
  
  function clearParseHistory() {
    parseHistory.value = []
    localStorage.removeItem('mini-bolt-parse-history')
  }
  
  function removeParseHistoryItem(index) {
    parseHistory.value.splice(index, 1)
    localStorage.setItem('mini-bolt-parse-history', JSON.stringify(parseHistory.value))
  }
  
  function useParseHistoryItem(index) {
    const historyItem = parseHistory.value[index]
    
    // Set current data
    projectInfo.value = { projectName: historyItem.projectName }
    parsedFiles.value = JSON.parse(JSON.stringify(historyItem.files)) // Deep copy
    parseInput.value = historyItem.parseInput || ''
    selectedFile.value = null
  }
  
  async function downloadParseHistoryItem(index) {
    const historyItem = parseHistory.value[index]
    try {
      const zip = new JSZip()
      const rootFolderName = historyItem.projectName || 'project'
      
      // Add files to zip
      historyItem.files.forEach(file => {
        zip.file(`${rootFolderName}/${file.filePath}`, file.content)
      })
      
      // Generate zip and download
      const content = await zip.generateAsync({ type: 'blob' })
      
      // Create download link
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = `${rootFolderName}.zip`
      
      // Trigger download
      document.body.appendChild(a)
      a.click()
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 100)
      
      return { success: true, fileName: `${rootFolderName}.zip` }
    } catch (error) {
      console.error('Download error:', error)
      return { success: false, error: error.message }
    }
  }
  
  return {
    parseInput,
    parsedFiles,
    selectedFile,
    projectInfo,
    parseHistory,
    fileTree,
    parseCode,
    selectFile,
    downloadFiles,
    addToParseHistory,
    clearParseHistory,
    removeParseHistoryItem,
    useParseHistoryItem,
    downloadParseHistoryItem
  }
})