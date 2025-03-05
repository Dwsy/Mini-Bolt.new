import { ref } from 'vue'
import { marked } from 'marked'

export function useMarkdown() {
  // Configure Markdown options
  const markdownOptions = ref({
    gfm: true,        // GitHub flavored markdown
    tables: true,     // Tables support
    breaks: false,    // Line breaks
    pedantic: false,  // Conform to original markdown spec
    sanitize: false,  // Sanitize HTML tags
    smartLists: true, // Smart list behavior
    smartypants: false // Smart punctuation
  })
  
  // Toggle Markdown option
  const toggleMarkdownOption = (option) => {
    markdownOptions.value[option] = !markdownOptions.value[option]
  }
  
  // Render Markdown to HTML
  const renderMarkdown = (text) => {
    try {
      // Configure marked with current options
      marked.setOptions(markdownOptions.value)
      return marked.parse(text)
    } catch (error) {
      console.error('Markdown parsing error:', error)
      return `<div class="text-error">Markdown parsing error: ${error.message}</div>`
    }
  }
  
  return {
    markdownOptions,
    toggleMarkdownOption,
    renderMarkdown
  }
}