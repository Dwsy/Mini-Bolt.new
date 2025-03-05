export function useFileUtils() {
  // Get language based on file extension
  const getLanguage = (fileName) => {
    if (!fileName) return 'Unknown'
    
    const ext = fileName.split('.').pop().toLowerCase()
    const langMap = {
      // 前端
      'js': 'JavaScript',
      'jsx': 'React JSX',
      'ts': 'TypeScript',
      'tsx': 'React TSX',
      'css': 'CSS',
      'scss': 'SCSS',
      'html': 'HTML',
      'vue': 'Vue.js',
      'svelte': 'Svelte',
      
      // 配置
      'json': 'JSON',
      'yml': 'YAML',
      'yaml': 'YAML',
      'toml': 'TOML',
      'xml': 'XML',
      'env': 'Env',
      
      // 后端
      'py': 'Python',
      'rb': 'Ruby',
      'php': 'PHP',
      'java': 'Java',
      'go': 'Go',
      'rs': 'Rust',
      'cs': 'C#',
      'scala': 'Scala',
      'swift': 'Swift',
      'kt': 'Kotlin',
      
      // 数据库
      'sql': 'SQL',
      'prisma': 'Prisma',
      
      // 文档
      'md': 'Markdown',
      'markdown': 'Markdown',
      'mdx': 'MDX',
      'txt': 'Text'
    }
    
    // Special file names
    if (fileName.toLowerCase() === 'dockerfile') {
      return 'Docker'
    } else if (fileName.toLowerCase().startsWith('docker-compose')) {
      return 'Docker Compose'
    } else if (fileName.toLowerCase() === '.gitignore') {
      return 'Git Ignore'
    } else if (fileName.toLowerCase() === '.env') {
      return 'Environment'
    }
    
    return langMap[ext] || (ext ? ext.toUpperCase() : 'Unknown')
  }
  
  // Check if file is markdown
  const isMarkdownFile = (fileName) => {
    const markdownExtensions = ['.md', '.markdown', '.mdown', '.mkdn', '.mkd', '.mdwn', '.mdtxt', '.mdtext']
    const lowerFileName = fileName.toLowerCase()
    return markdownExtensions.some(ext => lowerFileName.endsWith(ext))
  }
  
  // Get file icon URL
  const getFileIconUrl = (fileName) => {
    if (!fileName) return null
    
    const ext = fileName.toLowerCase().split('.').pop()
    
    // Tech stack mapping (using Devicon library)
    const techIcons = {
      // 前端
      'html': 'html5',
      'css': 'css3',
      'js': 'javascript',
      'jsx': 'react',
      'tsx': 'typescript',
      'ts': 'typescript',
      'vue': 'vuejs',
      'svelte': 'svelte',
      
      // 后端
      'py': 'python',
      'rb': 'ruby',
      'php': 'php',
      'java': 'java',
      'go': 'go',
      'rs': 'rust',
      'cs': 'csharp',
      'scala': 'scala',
      'swift': 'swift',
      'kt': 'kotlin',
      
      // 配置文件
      'json': 'json',
      'yml': 'yaml',
      'yaml': 'yaml',
      'xml': 'xml',
      'toml': 'coffeescript', // 使用类似的图标
      
      // 数据库
      'sql': 'mysql',
      
      // Markdown
      'md': 'markdown',
      'markdown': 'markdown',
      
      // 其他
      'docker': 'docker',
      'dockerfile': 'docker',
      'gitignore': 'git',
      'gitmodules': 'git',
      'npmrc': 'npm',
      'nvmrc': 'nodejs',
      'eslintrc': 'eslint',
      'prettierrc': 'javascript',
      'env': 'bash'
    }
    
    // Handle files with extensions
    if (fileName.includes('.')) {
      if (techIcons[ext]) {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techIcons[ext]}/${techIcons[ext]}-original.svg`
      }
    } else {
      // Handle special files without extensions
      const lowerFileName = fileName.toLowerCase()
      if (lowerFileName === 'dockerfile') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg`
      } else if (lowerFileName.startsWith('docker-compose')) {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg`
      } else if (lowerFileName === '.gitignore' || lowerFileName === '.gitmodules') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg`
      } else if (lowerFileName === '.env' || lowerFileName.endsWith('.env')) {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg`
      } else if (lowerFileName === 'tsconfig.json') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg`
      } else if (lowerFileName === 'package.json') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg`
      } else if (lowerFileName === 'readme.md') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg`
      } else if (lowerFileName === 'generateinfo.md') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg`
      }
    }
    
    // Default icon
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg`
  }
  
  return {
    getLanguage,
    isMarkdownFile,
    getFileIconUrl
  }
}